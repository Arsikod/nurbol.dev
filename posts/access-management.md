---
title: 'App access permission management'
date: '2022-11-07'
---

Permission to a certain routes or elements can be  
managed by <Permisson> wrapper component  
which utilizes `checkPermission` function.

**1) Provide types**

```ts
export type Roles = Array<string>;
export type EntityOwnerId = string | number;
export type PermissonType = 'one-of' | 'all-of';
export type Debug = boolean;

export type CheckPermissonConfig = {
  type?: PermissonType;
  entityOwnerId?: EntityOwnerId;
  debug?: Debug;
};
```

**2) Compone checkPermission function**

```ts
const permissonCheckTypeMethods = {
  'one-of': (roles: Roles) => roles.some,
  'all-of': (roles: Roles) => roles.every,
};

export function checkPermisson(
  user: User,
  roles: Roles,
  config: CheckPermissonConfig = {}
): boolean {
  const { type = 'one-of', entityOwnerId, debug = false } = config;

  //pick method depending on type
  const checkMethod =
    permissonCheckTypeMethods[type] || permissonCheckTypeMethods['one-of'];

  const userRoles = user?.roles ?? [];

  const hasAccess = checkMethod(roles).bind(roles)((role) => {
    if (role === 'owner') {
      return String(user?.id) === String(entityOwnerId);
    }

    if (role === 'logged-in') {
      return Boolean(user?.id);
    }

    return userRoles.includes(role);
  });

  debug &&
    console.log('PERMISSION_DEBUG', {
      hasAccess,
      requiredRoles: roles,
      userRoles,
      entityOwnerId,
      type,
    });

  return hasAccess;
}
```

**3) Construct permisson component**

```ts
export type PermissionProps = {
  children: React.ReactNode;
  roles: Roles;
  type?: PermissonType;
  noAccess?:
    | React.ReactNode
    | ((args: { user: User | null; hasAccess: boolean }) => React.ReactNode);
  entityOwnerId?: EntityOwnerId;
  debug?: Debug;
};

export default function Permission(props: PermissionProps) {
  const {
    children,
    roles = [],
    type = 'one-of',
    noAccess,
    entityOwnerId,
    debug = false,
  } = props;

  const user = useUserStore((store) => store.user);

  const [hasAccess, setHasAccess] = useState(
    user ? checkPermisson(user, roles, { type, entityOwnerId, debug }) : false
  );

  useEffect(() => {
    if (!user) {
      setHasAccess(false);
      return;
    }

    const doesHaveAccess = checkPermisson(user, roles, {
      type,
      entityOwnerId,
      debug,
    });

    setHasAccess(doesHaveAccess);
  }, [user?.id, user?.roles, entityOwnerId, roles, type, debug]);

  function renderNoAccess() {
    if (typeof noAccess === 'function') {
      return noAccess({ user, hasAccess });
    }

    return noAccess;
  }

  return hasAccess ? children : renderNoAccess() || null;
}
```

import { StyledIcon } from './Icon.styles';
import { IconProps } from './Icon.types';
import { icons } from '../../../assets/icons';

export default function Icon({ iconName, height, width }: IconProps) {
  const Component = icons[iconName];

  return (
    <StyledIcon width={width} height={height}>
      <Component />
    </StyledIcon>
  );
}

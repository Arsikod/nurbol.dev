import styled from 'styled-components';
import NextJsIcon from '../../assets/icons/nextjs2.svg';
import ReactIcon from '../../assets/icons/react.svg';

const icons: Record<string, any> = {
  nextjs: NextJsIcon,
  react: ReactIcon,
};

export interface IconProps {
  iconName: string;
  height?: string;
  width?: string;
}

export const StyledIcon = styled.span<{ height?: string; width?: string }>`
  svg {
    height: ${({ height }) => height}px;
    width: ${({ width }) => width}px;
  }
`;

export default function Icon({ iconName, height, width }: IconProps) {
  const Component = icons[iconName];

  return (
    <StyledIcon width={width} height={height}>
      <Component />
    </StyledIcon>
  );
}

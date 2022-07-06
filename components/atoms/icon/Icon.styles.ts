import styled from 'styled-components';
import { IconProps } from './Icon.types';

export const StyledIcon = styled.span<Omit<IconProps, 'iconName'>>`
  svg {
    height: ${({ height }) => height}px;
    width: ${({ width }) => width}px;
    vertical-align: text-bottom;
  }
`;

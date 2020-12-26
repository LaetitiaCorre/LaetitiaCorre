import * as React from "react";
import styled from "styled-components";
import {
  useOverlay,
  usePreventScroll,
  useModal,
  OverlayProps,
  OverlayContainer,
} from "@react-aria/overlays";
import { useDialog } from "@react-aria/dialog";
import { AriaDialogProps } from "@react-types/dialog";
import { FocusScope } from "@react-aria/focus";

interface LightboxProps extends OverlayProps, AriaDialogProps {
  children: React.ReactNode;
}

const Overlay = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 1rem;
  outline: none;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export function Lightbox({ children, ...props }: LightboxProps) {
  const ref = React.useRef();
  const { overlayProps } = useOverlay(props, ref);
  const { modalProps } = useModal();
  const { dialogProps } = useDialog(props, ref);

  usePreventScroll();

  return (
    <OverlayContainer>
      <Overlay>
        <FocusScope contain restoreFocus autoFocus>
          <ContentContainer
            {...overlayProps}
            {...dialogProps}
            {...modalProps}
            ref={ref}
          >
            {children}
          </ContentContainer>
        </FocusScope>
      </Overlay>
    </OverlayContainer>
  );
}

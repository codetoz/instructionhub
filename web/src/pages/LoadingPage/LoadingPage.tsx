import { styled } from '@mui/material';

function LoadingPage() {
  return (
    <Root>
      <span className="loader" />
    </Root>
  );
}

const Root = styled('div')`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .loader {
    border: 24px solid;
    border-color: rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25)
      rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: animloader 1s linear infinite;
  }

  @keyframes animloader {
    0% {
      border-color: rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25)
        rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.75);
    }
    33% {
      border-color: rgba(255, 255, 255, 0.75) rgba(255, 255, 255, 0.15)
        rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.35);
    }
    66% {
      border-color: rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.75)
        rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25);
    }
    100% {
      border-color: rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.35)
        rgba(255, 255, 255, 0.75) rgba(255, 255, 255, 0.15);
    }
  }
`;

export default LoadingPage;

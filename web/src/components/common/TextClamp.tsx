import { Button, styled, Typography } from '@mui/material';
import { useState, useEffect, useRef } from 'react';

interface Props {
  text: string;
  lineClamp?: number;
  disableShowMore?: boolean;
}

const TextClamp = ({
  text,
  lineClamp = 10,
  disableShowMore = false,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpand, setNeedsExpand] = useState(false);
  const textRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const checkTextOverflow = () => {
      if (!textRef.current) return;

      // Create a clone to measure natural height
      const clone = textRef.current.cloneNode(true) as HTMLDivElement;
      clone.style.webkitLineClamp = 'unset';
      clone.style.display = 'block';
      clone.style.visibility = 'hidden';
      clone.style.position = 'absolute';

      document.body.appendChild(clone);
      const naturalHeight = clone.offsetHeight;
      document.body.removeChild(clone);

      // Compare with clamped height
      const clampedHeight = textRef.current.offsetHeight;

      setNeedsExpand(naturalHeight > clampedHeight);
    };

    checkTextOverflow();
    window.addEventListener('resize', checkTextOverflow);

    return () => window.removeEventListener('resize', checkTextOverflow);
  }, [text]);

  return (
    <Root>
      <Typography
        component="pre"
        ref={textRef}
        sx={{
          ...(!isExpanded && {
            lineClamp: lineClamp,
            WebkitLineClamp: lineClamp,
          }),
        }}
        className={`text-content ${!isExpanded ? 'clamped' : ''}`}
      >
        {text}
      </Typography>

      {needsExpand && !disableShowMore && (
        <Button
          className="toggle-button"
          variant="outlined"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Typography variant="caption">
            {isExpanded ? 'Show less' : 'Show more'}
          </Typography>
        </Button>
      )}
    </Root>
  );
};

const Root = styled('div')`
  position: relative;
  line-height: 1.5;

  .text-content {
    white-space: pre-wrap;
  }

  .text-content.clamped {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    box-orient: vertical;
    overflow-y: hidden;
    text-overflow: ellipsis;
  }

  .toggle-button {
    display: block;
    margin-top: 12px;
    border-radius: 4px;
  }
`;

export default TextClamp;

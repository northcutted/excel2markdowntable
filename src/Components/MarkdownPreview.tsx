import React, { FC } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTheme } from '@mui/material/styles';

interface MarkdownPreviewProps {
  markdown: string;
}

/**
 * Renders a preview of Markdown content with custom styling for tables.
 *
 * @component
 * @param {MarkdownPreviewProps} props - The component props.
 * @param {string} props.markdown - The Markdown content to render.
 * @returns {JSX.Element} The rendered Markdown preview.
 */
const MarkdownPreview: FC<MarkdownPreviewProps> = ({ markdown }) => {
  const theme = useTheme();

  /**
   * Defines the CSS properties for the table in the MarkdownPreview component.
   */
  const tableStyle: React.CSSProperties = {
    borderCollapse: 'collapse',
    width: '100%',
    marginTop: theme.spacing(2),
  };

  /**
   * Defines the CSS properties for the table header cells.
   */
  const thStyle: React.CSSProperties = {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(1),
  };

  /**
   * CSS properties for table cells in the MarkdownPreview component.
   */
  const tdStyle: React.CSSProperties = {
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
    textAlign: 'left',
  };

  /**
   * Returns the CSS properties for the table row based on the index.
   * @param index - The index of the table row.
   * @returns The CSS properties for the table row.
   */
  const trStyle = (index: number): React.CSSProperties => ({
    backgroundColor: index % 2 ? theme.palette.action.hover : '',
  });

  const components = {
    table: ({ node, ...props }: any) => <table style={tableStyle} {...props} />,
    th: ({ node, ...props }: any) => <th style={thStyle} {...props} />,
    td: ({ node, ...props }: any) => <td style={tdStyle} {...props} />,
    tr: ({ node, index, ...props }: any) => <tr style={trStyle(index)} {...props} />,
  };

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={components}
    >
      {markdown}
    </Markdown>
  );
};

export default MarkdownPreview;
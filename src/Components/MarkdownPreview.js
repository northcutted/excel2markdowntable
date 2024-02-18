import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTheme } from '@mui/material/styles';

const MarkdownPreview = ({ markdown }) => {
  const theme = useTheme();

  // Define inline styles
  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    marginTop: theme.spacing(2),
  };

  const thStyle = {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(1),
  };

  const tdStyle = {
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
    textAlign: 'left',
  };

  const trStyle = (index) => ({
    backgroundColor: index % 2 ? theme.palette.action.hover : 'none',
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
  });

  const components = {
    table: ({ node, ...props }) => <table style={tableStyle} {...props} />,
    th: ({ node, ...props }) => <th style={thStyle} {...props} />,
    td: ({ node, ...props }) => <td style={tdStyle} {...props} />,
    tr: ({ node, index, ...props }) => <tr style={trStyle(index)} {...props} />,
  };

  return <Markdown children={markdown} remarkPlugins={[remarkGfm]} components={components} />;
};

export default MarkdownPreview;
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useStyles } from "./Styles";

const MarkdownPreview = ({ markdown }) => {
  const classes = useStyles();

  const components = {
    table: ({ node, ...props }) => (
      <table className={classes.markdownTable} {...props} />
    ),
    th: ({ node, ...props }) => (
      <th className={classes.markdownTableHeader} {...props} />
    ),
    td: ({ node, ...props }) => (
      <td className={classes.markdownTableCell} {...props} />
    ),
    tr: ({ node, ...props }) => (
      <tr className={classes.markdownTableRow} {...props} />
    ),
  };

  return (
    <Markdown
      children={markdown}
      remarkPlugins={[remarkGfm]}
      components={components}
    />
  );
};

export default MarkdownPreview;

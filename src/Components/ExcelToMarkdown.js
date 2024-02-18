import { useState } from "react";
import { Button, Tooltip } from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import MarkdownPreview from "./MarkdownPreview";
import { useStyles} from "./Styles";
import { useTheme } from "@mui/material/styles";
import { Snackbar } from "@mui/material";

const ExcelToMarkdown = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [markdown, setMarkdown] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);


  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = (event.clipboardData || window.clipboardData).getData(
      "text"
    );
    setMarkdown(convertToMarkdown(pasteData));
  };

  const convertToMarkdown = (pasteData) => {
    // Determine the delimiter based on the content (you might need a more robust check)
    const delimiter = pasteData.indexOf("\t") !== -1 ? "\t" : ",";

    // Split rows and filter out empty rows
    const rows = pasteData.split("\n").filter((row) => row.trim());

    // Generate header separator
    const headerCells = rows[0].split(delimiter).length;
    const headerSeparator = `| ${Array(headerCells).fill("---").join(" | ")} |`;

    // Map rows to markdown table format
    const markdownRows = rows.map((row) => {
      const cells = parseCSVRow(row, delimiter);
      return `| ${cells.join(" | ")} |`;
    });

    // Insert the header separator after the header row
    markdownRows.splice(1, 0, headerSeparator);

    return markdownRows.join("\n");
  };

  // Simple CSV/TSV row parser
  const parseCSVRow = (row, delimiter) => {
    // If the delimiter is a tab (\t), we can split directly since tabs won't be found in the cell content
    if (delimiter === "\t") {
      return row.split(delimiter).map((cell) => cell.trim());
    }

    // CSV parsing logic for comma-delimited data
    const cells = [];
    let cellBuffer = "";
    let inQuotes = false;

    for (let char of row) {
      if (char === '"' && inQuotes && cellBuffer.endsWith('"')) {
        cellBuffer = cellBuffer.slice(0, -1); // Remove quote from end of buffer
      } else if (char === '"' && inQuotes) {
        inQuotes = false; // End quoted sequence
      } else if (char === '"' && !inQuotes && cellBuffer === "") {
        inQuotes = true; // Start quoted sequence
      } else if (char === delimiter && !inQuotes) {
        cells.push(cellBuffer.trim());
        cellBuffer = "";
      } else {
        cellBuffer += char;
      }
    }

    // Push the last cell (if not empty after trimming)
    if (cellBuffer.trim()) {
      cells.push(cellBuffer.trim());
    }

    return cells;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown).then(() => {
      setSnackbarOpen(true); // Open the snackbar
      // Close the snackbar after 3 seconds
      setTimeout(() => setSnackbarOpen(false), 3000);
    });
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme })
  );

  return (
    <div className={classes.container}>
      <Textarea
        placeholder="Paste your Excel/CSV data here"
        onPaste={handlePaste}
        className={classes.textarea}
        minRows={10}
      />
      <div className={classes.markdownDisplay}>
        <div>{markdown && <pre>{markdown}</pre>}</div>
      </div>
      {markdown && (
          <Tooltip title="Copy to Clipboard" placement="top">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={copyToClipboard}
              startIcon={<FileCopyOutlinedIcon />}
            >
              Copy
            </Button>
          </Tooltip>
        )}
      <Snackbar
        open={snackbarOpen}
        message="Markdown copied to clipboard!"
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      />
      <div className={classes.markdownDisplay}>
        <MarkdownPreview markdown={markdown} />
      </div>
    </div>
  );
};

export default ExcelToMarkdown;

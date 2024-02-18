import { useState } from "react";
import { Button, Tooltip, Snackbar } from "@mui/material";
import TextField from "@mui/material/TextField";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/system/Box";
import MarkdownPreview from "./MarkdownPreview";

const ExcelToMarkdown = () => {
  const theme = useTheme();
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
    const delimiter = pasteData.indexOf("\t") !== -1 ? "\t" : ",";
    const rows = pasteData.split("\n").filter((row) => row.trim());
    const headerCells = rows[0].split(delimiter).length;
    const headerSeparator = `| ${Array(headerCells).fill("---").join(" | ")} |`;
    const markdownRows = rows.map((row) => {
      const cells = parseCSVRow(row, delimiter);
      return `| ${cells.join(" | ")} |`;
    });
    markdownRows.splice(1, 0, headerSeparator);
    return markdownRows.join("\n");
  };

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
      setSnackbarOpen(true);
      setTimeout(() => setSnackbarOpen(false), 3000);
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
        padding: theme.spacing(1),
        width: "75%",
      }}
    >
      <TextField
        placeholder="Paste your Excel/CSV data here"
        variant="outlined"
        margin="normal"
        onPaste={handlePaste}
        sx={{
          width: "100%",
          height: "auto",
          bgcolor: theme.palette.background.paper,
          padding: theme.spacing(1),
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: theme.shape.borderRadius,
          color: theme.palette.text.primary,
        }}
        rows={10}
      />

      {markdown && (
        <Box
          sx={{
            height: "auto",
            bgcolor: theme.palette.background.paper.dark,
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: theme.shape.borderRadius,
            color: theme.palette.text.primary,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "auto",
            padding: theme.spacing(2),
            width: "75%",
          }}
        >
          <p>Markdown Output</p>
          <pre>{markdown}</pre>

          <Tooltip title="Copy to Clipboard" placement="top">
            <Button
              variant="contained"
              color="primary"
              sx={{
                margin: theme.spacing(2),
                padding: theme.spacing(1, 2),
                fontSize: "16px",
                textTransform: "uppercase",
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.common.white,
                borderRadius: theme.shape.borderRadius,
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
              onClick={copyToClipboard}
              startIcon={<FileCopyOutlinedIcon />}
            >
              Copy
            </Button>
          </Tooltip>
        </Box>
      )}

      <Snackbar
        open={snackbarOpen}
        message="Markdown copied to clipboard!"
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      />

      {markdown && <h2>Rendered Markdown Conversion Preview:</h2> }
      <MarkdownPreview markdown={markdown} />
    </Box>
  );
};

export default ExcelToMarkdown;

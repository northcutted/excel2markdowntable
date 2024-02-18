import { useState } from "react";
import {
  Button,
  Tooltip,
  Snackbar,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/system/Box";
import MarkdownPreview from "./MarkdownPreview";

const ExcelToMarkdown = () => {
  const theme = useTheme();
  const [markdown, setMarkdown] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [hasHeaders, setHasHeaders] = useState(true);

  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = (event.clipboardData || window.clipboardData).getData(
      "text"
    );
    setMarkdown(convertToMarkdown(pasteData, hasHeaders));
  };

  const convertToMarkdown = (pasteData, includeHeaders) => {
    const delimiter = pasteData.indexOf("\t") !== -1 ? "\t" : ",";
    let rows = pasteData.split("\n").filter((row) => row.trim());
    const columns = rows.map((row) => parseCSVRow(row, delimiter));

    const columnWidths = columns[0].map((col, i) =>
      Math.max(...columns.map((row) => row[i]?.length || 0))
    );

    if (!includeHeaders) {
      const headerRow = columnWidths.map((width) => {
        const sideSpaces = Math.max(0, Math.floor((width - 1) / 2));
        return (
          " ".repeat(sideSpaces) + "x" + " ".repeat(width - sideSpaces - 1)
        );
      });
      columns.unshift(headerRow);
    }

    const padCell = (cell, index) => cell.padEnd(columnWidths[index], " ");

    let markdownRows = columns.map((row) => {
      const cells = row.map(padCell);
      return `| ${cells.join(" | ")} |`;
    });

    const headerSeparator = `| ${columnWidths
      .map((width) => "-".repeat(width))
      .join(" | ")} |`;
    markdownRows.splice(1, 0, headerSeparator);
    return markdownRows.join("\n");
  };

  const handleSwitchChange = (event) => {
    setHasHeaders(event.target.checked);
  };

  const parseCSVRow = (row, delimiter) => {
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
        width: "80%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: 'column', // Stack elements vertically on small screens
            sm: 'row', // Use row layout on larger screens
          },
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Tooltip
          title="Please do not paste sensitive data here. I don't collect any data, but you don't know that and can't trust me."
          placement="top"
        >
          <TextField
            placeholder="Paste your Excel/CSV data here"
            variant="outlined"
            margin="normal"
            onPaste={handlePaste}
            sx={{
              flexGrow: 1,
              marginRight: { xs: 0, sm: theme.spacing(1) }, // Remove margin on small screens
              width: { xs: '100%', sm: 'auto' }, // Full width on small screens
            }}
          />
        </Tooltip>
        <Tooltip
          title="When set to false, will create headers in the first row with the value of x."
          placement="top"
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={hasHeaders}
                onChange={handleSwitchChange}
                name="hasHeadersCheckbox"
                color="secondary"
              />
            }
            label="First row contains headers"
            sx={{
              margin: { xs: theme.spacing(1, 0), sm: theme.spacing(2) }, // Reduce margin on top and bottom for small screens
            }}
          />
        </Tooltip>
      </Box>

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
            width: "100%",
          }}
        >
          <h3>Markdown Output</h3>
          <Box
            component="pre"
            sx={{
              backgroundColor: "background.paper",
              border: 1,
              borderColor: "divider",
              padding: 2,
              borderRadius: 1,
              overflowX: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            {markdown}
          </Box>
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
                  backgroundColor: theme.palette.secondary.dark,
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

      {markdown && <h3>Rendered Markdown Conversion Preview:</h3>}
      <MarkdownPreview markdown={markdown} />
    </Box>
  );
};

export default ExcelToMarkdown;

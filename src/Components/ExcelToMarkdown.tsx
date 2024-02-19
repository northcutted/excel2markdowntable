import React, { FC, useState } from 'react';
import { Button, Tooltip, Snackbar, FormControlLabel, Checkbox } from '@mui/material';
import TextField from '@mui/material/TextField';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/system/Box';
import MarkdownPreview from './MarkdownPreview';

/**
 * Converts Excel or CSV data to Markdown format.
 * 
 * @returns A React functional component.
 */
const ExcelToMarkdown: FC = () => {
  const theme = useTheme();
  const [markdown, setMarkdown] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [hasHeaders, setHasHeaders] = useState<boolean>(true);

  /**
   * Handles the paste event and converts the pasted data to Markdown.
   * @param event - The clipboard event.
   */
  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const pasteData = (event.clipboardData || window.navigator.clipboard).getData('text');
    setMarkdown(convertToMarkdown(pasteData, hasHeaders));
  };

  /**
   * Converts the given paste data into a Markdown table.
   * 
   * @param pasteData - The data to be converted.
   * @param includeHeaders - Indicates whether to include headers in the Markdown table.
   * @returns The Markdown representation of the data.
   */
  const convertToMarkdown = (pasteData: string, includeHeaders: boolean): string => {
    const delimiter = pasteData.indexOf('\t') !== -1 ? '\t' : ',';
    let rows = pasteData.split('\n').filter((row) => row.trim());
    const columns = rows.map((row) => parseCSVRow(row, delimiter));

    const columnWidths = columns[0].map((col, i) =>
      Math.max(...columns.map((row) => row[i]?.length || 0))
    );

    if (!includeHeaders) {
      const headerRow = columnWidths.map((width) => {
        const sideSpaces = Math.max(0, Math.floor((width - 1) / 2));
        return (
          ' '.repeat(sideSpaces) + 'x' + ' '.repeat(width - sideSpaces - 1)
        );
      });
      columns.unshift(headerRow);
    }

    const padCell = (cell: string, index: number) => cell.padEnd(columnWidths[index], ' ');

    let markdownRows = columns.map((row) => {
      const cells = row.map(padCell);
      return `| ${cells.join(' | ')} |`;
    });

    const headerSeparator = `| ${columnWidths
      .map((width) => '-'.repeat(width))
      .join(' | ')} |`;
    markdownRows.splice(1, 0, headerSeparator);
    return markdownRows.join('\n');
  };

  /**
   * Handles the change event of the switch component.
   * @param event - The change event object.
   */
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasHeaders(event.target.checked);
  };

  /**
   * Parses a CSV row into an array of cells.
   * @param row - The CSV row to parse.
   * @param delimiter - The delimiter used in the CSV row.
   * @returns An array of cells.
   */
  const parseCSVRow = (row: string, delimiter: string): string[] => {
    const cells: string[] = [];
    let cellBuffer = '';
    let inQuotes = false;

    for (let char of row) {
      if (char === '"' && inQuotes && cellBuffer.endsWith('"')) {
        cellBuffer = cellBuffer.slice(0, -1);
      } else if (char === '"' && inQuotes) {
        inQuotes = false;
      } else if (char === '"' && !inQuotes && cellBuffer === '') {
        inQuotes = true;
      } else if (char === delimiter && !inQuotes) {
        cells.push(cellBuffer.trim());
        cellBuffer = '';
      } else {
        cellBuffer += char;
      }
    }

    if (cellBuffer.trim()) {
      cells.push(cellBuffer.trim());
    }

    return cells;
  };

  /**
   * Copies the markdown content to the clipboard.
   */
  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown).then(() => {
      setSnackbarOpen(true);
      setTimeout(() => setSnackbarOpen(false), 3000);
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto',
        padding: theme.spacing(1),
        width: '80%',
        '@media (max-width:600px)': {
          width: '95%',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
          '@media (max-width:600px)': {
            flexDirection: 'column',
          },
        }}
      >
        <Tooltip
          title="Please do not paste sensitive data here. I don't collect any data, but you don't know that and can't you trust me."
          placement="top"
        >
          <TextField
            placeholder="Paste your Excel/CSV data here"
            variant="outlined"
            margin="normal"
            onPaste={handlePaste}
            sx={{
              flexGrow: 1,
              marginRight: { xs: 0, sm: theme.spacing(1) },
              width: { xs: '100%', sm: 'auto' }, 
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
              margin: { xs: theme.spacing(1, 0), sm: theme.spacing(2) },
            }}
          />
        </Tooltip>
      </Box>

      {markdown && (
        <Box
          sx={{
            height: 'auto',
            bgcolor: theme.palette.background.paper,
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: theme.shape.borderRadius,
            color: theme.palette.text.primary,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: 'auto',
            padding: theme.spacing(2),
            width: '100%',
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: '400px',
          }}
        >
          <h3>Markdown Output</h3>
          <Box
            component="pre"
            sx={{
              backgroundColor: 'background.paper',
              border: 1,
              borderColor: 'divider',
              padding: 2,
              borderRadius: 1,
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
              maxHeight: '300px',
              overflowY: 'auto',
              maxWidth: '100%',
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
                padding: theme.spacing(1),
                minWidth: '120px',
                fontSize: '16px',
                textTransform: 'uppercase',
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.common.white,
                borderRadius: theme.shape.borderRadius,
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                '&:hover': {
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
import { google } from "googleapis";

type RSVPRow = {
  timestamp: string;
  name: string;
  guests: number;
  source: string;
};

const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");
const range = process.env.GOOGLE_SHEETS_RANGE ?? "Sheet1!A:D";

function getSheetsClient() {
  if (!spreadsheetId || !clientEmail || !privateKey) return null;

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  return {
    spreadsheetId,
    range,
    sheets: google.sheets({ version: "v4", auth })
  };
}

export async function appendRSVP(row: RSVPRow) {
  const client = getSheetsClient();
  if (!client) return false;

  await client.sheets.spreadsheets.values.append({
    spreadsheetId: client.spreadsheetId,
    range: client.range,
    valueInputOption: "RAW",
    requestBody: {
      values: [[row.timestamp, row.name, row.guests, row.source]]
    }
  });

  return true;
}

export async function getTotalConfirmed() {
  const client = getSheetsClient();
  if (!client) return 0;

  const result = await client.sheets.spreadsheets.values.get({
    spreadsheetId: client.spreadsheetId,
    range: client.range
  });

  const rows = result.data.values ?? [];
  if (rows.length <= 1) return 0;

  return rows.slice(1).reduce((sum, row) => {
    const guests = Number(row?.[2] ?? 0);
    return Number.isFinite(guests) ? sum + guests : sum;
  }, 0);
}

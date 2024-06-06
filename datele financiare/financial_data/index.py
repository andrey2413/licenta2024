import yfinance as yf
import pandas as pd

def fetch_company_data(ticker):
    try:
        company = yf.Ticker(ticker)
        company_info = company.info
        return company_info
    except Exception as e:
        print(f"Failed to fetch data for {ticker}: {e}")
        return None

def main():
    # Path to your CSV file containing ticker symbols
    csv_file = "company_tickers.csv"

    # Read CSV file into a pandas DataFrame
    try:
        df = pd.read_csv(csv_file)
    except FileNotFoundError:
        print(f"Error: CSV file '{csv_file}' not found.")
        return

    # Fetch data for each company
    company_data = []
    for ticker in df['Ticker']:
        data = fetch_company_data(ticker)
        if data:
            company_data.append(data)

    # Convert the list of dictionaries to a DataFrame
    company_df = pd.DataFrame(company_data)

    # Output the company data to a new CSV file
    company_df.to_csv("company_data.csv", index=False)
    print("Company data saved to 'company_data.csv'")

if __name__ == "__main__":
    main()

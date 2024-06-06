import yfinance as yf
import pandas as pd
from datetime import datetime, timedelta

def fetch_company_data(ticker):
    try:
        company = yf.Ticker(ticker)
        company_info = company.info
        return company_info
    except Exception as e:
        print(f"Failed to fetch data for {ticker}: {e}")
        return None

def fetch_historical_data(ticker, start_date, end_date):
    try:
        company = yf.Ticker(ticker)
        data = company.history(start=start_date, end=end_date)
        if data.empty:
            print(f"No historical data for {ticker} between {start_date} and {end_date}")
            return None
        return data
    except Exception as e:
        print(f"Failed to fetch historical data for {ticker}: {e}")
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

    # Define start and end dates for historical data (last 7 days)
    end_date = datetime.now().strftime('%Y-%m-%d')
    start_date = (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d')

    # Fetch company details and historical data for each company
    combined_data = []
    for ticker in df['Ticker']:
        print(f"Processing {ticker}...")
        company_info = fetch_company_data(ticker)
        historical_data = fetch_historical_data(ticker, start_date, end_date)

        if company_info and historical_data is not None:
            # Add ticker symbol to historical data
            historical_data['Ticker'] = ticker
            # Add company details to historical data by broadcasting the values
            for key, value in company_info.items():
                historical_data[key] = [value] * len(historical_data)
            # Reset the index to get the Date as a column
            historical_data.reset_index(inplace=True)
            # Append the historical data DataFrame to the list
            combined_data.append(historical_data)

    if combined_data:
        # Concatenate all DataFrames in the combined_data list
        combined_df = pd.concat(combined_data)
        # Output the combined data to a new CSV file
        combined_df.to_csv("combined_data.csv", index=False)
        print("Combined data saved to 'combined_data.csv'")
    else:
        print("No data to save.")

if __name__ == "__main__":
    main()

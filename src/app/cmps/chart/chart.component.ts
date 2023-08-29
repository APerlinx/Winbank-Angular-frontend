import { Component, OnInit } from '@angular/core'
import { BitcoinData } from 'src/app/models/bitcoin.model'
import { FinanceService } from 'src/app/services/finance.service'
import { ChartType } from 'angular-google-charts'

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  companyQuotes: any[] = []

  public bitcoinChartData: any[] = []
  public columnNames = ['Date', 'Price']
  public lineChartType: ChartType = ChartType.LineChart
  title = 'Bitcoin market price'
  titleStock = 'My S&P 500 stock'
  public candlestickChartType: ChartType = ChartType.CandlestickChart
  public sp500ChartData: any[] = []

  public columnChartType: ChartType = ChartType.ColumnChart
  public spendingChartData: any[] = []

  constructor(private financeService: FinanceService) {}

  ngOnInit(): void {
    this.fetchSP500CandlestickData()
    this.fetchBitcoinData()
    this.initSpendingData()
  }
  fetchBitcoinData(): void {
    this.financeService.getBitcoinPriceData().subscribe((data) => {
      this.bitcoinChartData = data.values.map((item: any) => [
        new Date(item.x * 1000),
        item.y,
      ])
    })
  }

  fetchSP500CandlestickData(): void {
    this.financeService.getCompanyQuotes(['AAPL', 'FB']).subscribe((data) => {
      this.sp500ChartData = data.map((stock: any) => {
        return [
          stock.name,
          Number(stock.dayLow),
          Number(stock.open),
          Number(stock.price),
          Number(stock.dayHigh),
        ]
      })
    })
  }

  initSpendingData(): void {
    this.spendingChartData = [
      ['January', 2000],
      ['February', 2500],
      ['March', 2100],
      ['April', 1800],
      ['May', 2300],
    ]
  }
}

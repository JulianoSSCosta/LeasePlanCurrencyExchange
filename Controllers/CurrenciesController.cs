using LeasePlanCurrencyExchange.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net;

namespace LeasePlanCurrencyExchange.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CurrenciesController : ControllerBase
    {
    


        [HttpGet]
        public IActionResult GetAllCurrencies()
        {
            

            var myJsonString = System.IO.File.ReadAllText("Database/currencies.json");
            var jsonModel = JsonConvert.DeserializeObject<IEnumerable<Currencies>>(myJsonString);


            return Ok(jsonModel);
        }
        [HttpGet("{id}")]
        public IActionResult GetRatesByCurrency(string id, double amount, string currencyTo)
        {
            var url = "https://api.exchangerate.host/latest?base=" + id;
            var client = new WebClient();
        
            var response = client.DownloadString(url);
            var jsonModel = JsonConvert.DeserializeObject<CurrencyRates>(response);
            double valueConvert = 0;
            if (amount > 0)
            {
                var currencies = new Currencies();
                float rate = (float)jsonModel.rates[currencyTo];
                valueConvert = currencies.CalculateExchange(amount, rate);
            }
            return Ok(new { jsonModel.@base, jsonModel.date, valueConvert,  jsonModel.rates });
        }




    }
}

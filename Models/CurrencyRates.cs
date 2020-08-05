using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeasePlanCurrencyExchange.Models
{
    public class CurrencyRates
    {
        public string @base { get; set; }
        public string date { get; set; }
        public Dictionary<string, decimal> rates { get; set; }
    }
}

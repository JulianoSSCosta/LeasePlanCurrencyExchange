using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeasePlanCurrencyExchange.Models
{
    public class Currencies
    {

        public string symbol { get; set; }

        public string name { get; set; }

        public string symbol_native { get; set; }

        public string decimal_digits { get; set; }

        public decimal rounding { get; set; }

        public string code { get; set; }

        public string name_plural { get; set; }


        public double CalculateExchange(double Amount, double Rate)
        {
            return Amount * Rate;
        }



    }


}

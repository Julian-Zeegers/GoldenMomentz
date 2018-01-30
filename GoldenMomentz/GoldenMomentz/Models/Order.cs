using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace GoldenMomentz.Models
{
    public class Order
    {
        public int Id { get; set; }

        public int OrderBookId { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }

        [Required]
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }

        [Required]
        public int SalesPersonId { get; set; }
        public SalesPerson SalesPerson { get; set; }

        [Required]
        public int PurchasePrice { get; set; }

        public int Deposit { get; set; }

        public int PenaltyCharge { get; set; }

        [StringLength(512)]
        public string Notes { get; set; }
    }
}
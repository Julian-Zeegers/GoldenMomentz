using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using GoldenMomentz.Models;

namespace GoldenMomentz.Dtos
{
    public class OrderDto
    {
        public int Id { get; set; }

        public int OrderBookId { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }

        [Required]
        public CustomerDto Customer { get; set; }

        [Required]
        public SalesPersonDto SalesPerson { get; set; }
        
        [Required]
        public int PurchasePrice { get; set; }

        public int Deposit { get; set; }

        public int PenaltyCharge { get; set; }

        [StringLength(512)]
        public string Notes { get; set; }
    }
}
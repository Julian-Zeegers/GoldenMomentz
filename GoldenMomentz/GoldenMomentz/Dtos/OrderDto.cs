using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using GoldenMomentz.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace GoldenMomentz.Dtos
{
    public class OrderDto
    {
        public int Id { get; set; }

        public int OrderBookId { get; set; }

        [Required]
        [Column(TypeName = "datetime2")]
        public DateTime DateCreated { get; set; }

        [Required]
        public int CustomerId { get; set; }

        public CustomerDto Customer { get; set; }

        [Required]
        public int SalesPersonId { get; set; }

        public SalesPersonDto SalesPerson { get; set; }
        
        [Required]
        public int PurchasePrice { get; set; }

        public int Deposit { get; set; }

        public int PenaltyCharge { get; set; }

        [StringLength(512)]
        public string Notes { get; set; }
    }
}
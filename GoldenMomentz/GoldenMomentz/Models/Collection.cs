using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace GoldenMomentz.Models
{
    public class Collection
    {
        public int Id { get; set; }

        [Required]
        public DateTime CollectionDate { get; set; }

        [Required]
        public int OrderId { get; set; }
        public Order Order { get; set; }

        [Required]
        public int Amount { get; set; }

        public bool Paid { get; set; }

        [StringLength(512)]
        public string Notes { get; set; }
    }
}
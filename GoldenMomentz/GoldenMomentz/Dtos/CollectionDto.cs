using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using GoldenMomentz.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace GoldenMomentz.Dtos
{
    public class CollectionDto
    {
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "datetime2")]
        public DateTime CollectionDate { get; set; }

        [Required]
        public int OrderId { get; set; }

        public OrderDto Order { get; set; }

        [Required]
        public int Amount { get; set; }

        [DefaultValue(false)]
        public bool Paid { get; set; }

        [StringLength(512)]
        public string Notes { get; set; }
    }
}
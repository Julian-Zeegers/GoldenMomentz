using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace GoldenMomentz.Models
{
    public class Customer
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string FirstName { get; set; }

        [StringLength(255)]
        public string Surname { get; set; }

        public int? IdNumber { get; set; }

        [StringLength(10)]
        public string CellPhoneNumber { get; set; }

        [StringLength(10)]
        public string WorkPhoneNumber { get; set; }

        public string Address { get; set; }
    }
}
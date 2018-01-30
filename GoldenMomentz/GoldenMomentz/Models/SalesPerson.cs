﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace GoldenMomentz.Models
{
    public class SalesPerson
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        public string IdNumber { get; set; }

        [StringLength(10)]
        public string CellPhoneNumber { get; set; }

        [StringLength(10)]
        public string WorkPhoneNumber { get; set; }

        public string Email { get; set; }
    }
}
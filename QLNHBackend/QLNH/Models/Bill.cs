using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QLNH.Models
{
    public class Bill
    {
        [Key]
        public int Id { get; set; }
        public int ItemId { get; set; }
        public int PutId { get; set; }
        public int Quantity { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool Deleted { get; set; }
    }
}

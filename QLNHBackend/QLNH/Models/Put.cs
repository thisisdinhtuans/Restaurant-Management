using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QLNH_APIs.Models
{
    public class Put
    {
        [Key]
        public int PutId { get; set; }
        public string PutNumber { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool Deleted { get; set; }
        public bool Voided { get; set; }
        public double TotalPrice { get; set; }
        public double PaidAmount { get; set; }

        public int GuestId { get; set; }
        //public virtual IList<PutItem> PutItem { get; set; }
    }
}
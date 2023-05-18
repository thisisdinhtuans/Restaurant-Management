using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using QLNH.Models;
using QLNH_APIs.Data;
using QLNH_APIs.Models;

namespace QLNH_APIs.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BillController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public BillController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Bill> Get()
        {
            return _context.Bill.ToList();
            //return _context.Restaurant
            //    .Where(c => !c.Deleted)
            //    .Include(r => r.CreatedUser)
            //    .Include(r => r.UpdatedUser)
            //    .ToList();
        }

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<RestaurantDTO>>> Get()
        //{
        //    try
        //    {
        //        var data = await _context.Restaurant
        //            .Include(r => r.CreatedUser)
        //            .Include(r => r.UpdatedUser).ToArrayAsync();
        //        var model = _mapper.Map<IEnumerable<RestaurantDTO>>(data);
        //        return new JsonResult(model);
        //    }
        //    catch (ArgumentException ex)
        //    {
        //        return BadRequest("not good");
        //    }
        //}



        [HttpPost]
        public Bill Post([FromBody] Bill Bill)
        {
            _context.Bill.Add(Bill);
            _context.SaveChanges();
            return Bill;
        }

        [HttpPut]
        public Bill Put([FromBody] Bill Bill)
        {
            var bill = _context.Bill.Find(Bill.Id);
            if (bill == null)
            {
                return null;
            }
            bill.ItemId = Bill.ItemId;
            bill.PutId = Bill.PutId;
            bill.Quantity = Bill.Quantity;
            bill.Deleted = Bill.Deleted;
            _context.SaveChanges();
            return bill;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using QLNH_APIs.Data;
using QLNH_APIs.Models;

namespace QLNH_APIs.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PutController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public PutController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Put> Get()
        {
            return _context.Put.ToList();
            //return _context.Restaurant
            //    .Where(c => !c.Deleted)
            //    .Include(r => r.CreatedUser)
            //    .Include(r => r.UpputedUser)
            //    .ToList();
        }

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<RestaurantDTO>>> Get()
        //{
        //    try
        //    {
        //        var puta = await _context.Restaurant
        //            .Include(r => r.CreatedUser)
        //            .Include(r => r.UpputedUser).ToArrayAsync();
        //        var model = _mapper.Map<IEnumerable<RestaurantDTO>>(puta);
        //        return new JsonResult(model);
        //    }
        //    catch (ArgumentException ex)
        //    {
        //        return BadRequest("not good");
        //    }
        //}



        [HttpPost]
        public Put Post([FromBody] Put Put)
        {
            _context.Put.Add(Put);
            _context.SaveChanges();
            return Put;
        }

        [HttpPut]
        public Put Put([FromBody] Put Put)
        {
            var put = _context.Put.Find(Put.PutId);
            if (put == null)
            {
                return null;
            }
            put.PutNumber = Put.PutNumber;
            put.Description = Put.Description;
            put.Voided = Put.Voided;
            put.TotalPrice = Put.TotalPrice;
            put.PaidAmount = Put.PaidAmount;
            put.Deleted = Put.Deleted;
            put.GuestId = Put.GuestId;

            _context.SaveChanges();
            return put;
        }
    }
}

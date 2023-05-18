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
    public class GuestController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public GuestController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Guest> Get()
        {
            return _context.Guest.ToList();
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
        public Guest Post([FromBody] Guest Guest)
        {
            _context.Guest.Add(Guest);
            _context.SaveChanges();
            return Guest;
        }

        [HttpPut]
        public Guest Put([FromBody] Guest Guest)
        {
            var guest = _context.Guest.Find(Guest.GuestId);
            if (guest == null)
            {
                return null;
            }
            guest.Name = Guest.Name;
            guest.Description = Guest.Description;
            guest.Phone = Guest.Phone;
            guest.Deleted = Guest.Deleted;

            _context.SaveChanges();
            return guest;
        }
    }
}

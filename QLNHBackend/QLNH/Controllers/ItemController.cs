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
    public class ItemController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ItemController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Item> Get()
        {
            return _context.Item.ToList();
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
        public Item Post([FromBody] Item Item)
        {
            _context.Item.Add(Item);
            _context.SaveChanges();
            return Item;
        }

        [HttpPut]
        public Item Put([FromBody] Item Item)
        {
            var item = _context.Item.Find(Item.ItemId);
            if (item == null)
            {
                return null;
            }
            item.Name = Item.Name;
            item.Description = Item.Description;
            item.Quantity = Item.Quantity;
            item.Price = Item.Price;
            item.Discount = Item.Discount;
            item.CategoryId = Item.CategoryId;
            item.Deleted = Item.Deleted;



            _context.SaveChanges();
            return item;
        }
    }
}

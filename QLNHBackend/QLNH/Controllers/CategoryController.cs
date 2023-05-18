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
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public CategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Category> Get()
        {
            return _context.Category.ToList();
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
        public Category Post([FromBody] Category Category)
        {
            _context.Category.Add(Category);
            _context.SaveChanges();
            return Category;
        }

        [HttpPut]
        public Category Put([FromBody] Category Category)
        {
            var category = _context.Category.Find(Category.CategoryId);
            if (category == null)
            {
                return null;
            }
            category.Name = Category.Name;
            category.Description = Category.Description;
            category.Deleted = Category.Deleted;

            _context.SaveChanges();
            return category;
        }
    }
}

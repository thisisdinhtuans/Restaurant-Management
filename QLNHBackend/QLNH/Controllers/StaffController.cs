//using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QLNH_APIs.Data;
//using QLNH_APIs.DTO;
//using QLNH_APIs.DTO;
using QLNH_APIs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLNH_APIs.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StaffController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        //private readonly IMapper _mapper;
        public StaffController(ApplicationDbContext context)
        {//, IMapper mapper
            _context = context;
            //_mapper = mapper;
        }
        [HttpGet]
        public IEnumerable<Staff> Get()
        {
            return _context.Staff.ToList();
            //return _context.Staff
            //    .Where(c => !c.Deleted)
            //    .Include(r => r.CreatedUser)
            //    .Include(r => r.UpdatedUser)
            //    .ToList();
        }

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<StaffDTO>>> Get()
        //{
        //    try
        //    {
        //        var data = await _context.Staff
        //            .Include(r => r.CreatedUser)
        //            .Include(r => r.UpdatedUser).ToArrayAsync();
        //        var model = _mapper.Map<IEnumerable<StaffDTO>>(data);
        //        return new JsonResult(model);
        //    }
        //    catch (ArgumentException ex)
        //    {
        //        return BadRequest("not good");
        //    }
        //}



        [HttpPost]
        public Staff Post([FromBody] Staff Staff)
        {
            _context.Staff.Add(Staff);
            _context.SaveChanges();
            return Staff;
        }

        [HttpPut]
        public Staff Put([FromBody] Staff Staff)
        {
            var staff = _context.Staff.Find(Staff.Id);
            if (staff == null)
            {
                return null;
            }
            staff.Name = Staff.Name;
            staff.Password = Staff.Password;
            staff.Description = Staff.Description;
            staff.Deleted = Staff.Deleted;
            staff.RoleId = Staff.RoleId;


            _context.SaveChanges();
            return staff;
        }
    }
}
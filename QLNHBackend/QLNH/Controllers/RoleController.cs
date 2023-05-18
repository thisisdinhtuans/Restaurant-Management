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
    public class RoleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public RoleController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lấy tất cả danh sách Roles
        /// </summary>
        /// <returns>Danh sách Roles</returns>
        [HttpGet]
        public IEnumerable<Role> Get()
        {
            return _context.Role.ToList();
        }

        /// <summary>
        /// Lấy Role với Id
        /// </summary>
        /// <returns>Danh sách Role</returns>
        /// <param name="Id">Tham số là Id của Role</param>
        [HttpGet("Id")]
        public Role Get([FromQuery] int Id)
        {
            return _context.Role.Where(role => role.RoleId == Id).FirstOrDefault();
        }

        /// <summary>
        /// Thêm Role mới
        /// </summary>
        /// <returns>Role</returns>
        [HttpPost]
        public Role Post([FromBody] Role Role)
        {
            _context.Role.Add(Role);
            _context.SaveChanges();
            return Role;
        }

        [HttpPut]
        public Role Put([FromBody] Role Role)
        {
            var role = _context.Role.Find(Role.RoleId);
            if (role == null)
            {
                return null;
            }
            role.Name = Role.Name;
            role.Description = Role.Description;
            role.Deleted = Role.Deleted;

            _context.SaveChanges();
            return role;
        }
    }
}
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using AutoMapper;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using QLNH_APIs.Data;
//using QLNH_APIs.DTO;
////using QLNH_APIs.DTO;
//using QLNH_APIs.Models;

//namespace QLNH_APIs.Controllers
//{
//    [ApiController]
//    [Route("[controller]")]
//    public class RoleController : ControllerBase
//    {
//        private readonly ApplicationDbContext _context;
//        private readonly IMapper _mapper;
//        public RoleController(ApplicationDbContext context, IMapper mapper)
//        {//, IMapper mapper
//            _context = context;
//            _mapper = mapper;
//        }

//        /// <summary>
//        /// Lấy tất cả danh sách Roles
//        /// </summary>
//        /// <returns>Danh sách Roles</returns>
//        [HttpGet]
//        public IEnumerable<Role> Get()
//        {
//            return _context.Role.ToList();
//        }


//        /// <summary>
//        /// Lấy Role với Id
//        /// </summary>
//        /// <returns>Danh sách Role</returns>
//        /// <param name="Id">Tham số là Id của Role</param>
//        //[HttpGet("Id")]
//        //public Role Get([FromQuery] int Id)
//        //{
//        //    return _context.Role.Where(role => role.Id == Id).FirstOrDefault();
//        //}

//        /// <summary>
//        /// Thêm Role mới
//        /// </summary>
//        /// <returns>Role</returns>
//        [HttpPost]
//        public Role Post([FromQuery] Role Role)
//        {
//            _context.Role.Add(Role);
//            _context.SaveChanges();
//            return Role;
//        }
//    }
//}
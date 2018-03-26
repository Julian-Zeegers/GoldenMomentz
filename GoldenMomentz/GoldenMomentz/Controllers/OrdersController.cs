using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using GoldenMomentz.Models;
using System.Web.Http;
using GoldenMomentz.Dtos;
using System.Data.Entity;
using System.Web.Http.Cors;

namespace GoldenMomentz.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class OrdersController : ApiController
    {
        private ApplicationDbContext _context;

        public OrdersController()
        {
            _context = new ApplicationDbContext();
        }

        // GET /api/Orders
        public IHttpActionResult GetOrders(string query = null)
        {
            var OrdersQuery = _context.Orders.Include(c => c.Customer).Include(s => s.SalesPerson); ;


            //if (!String.IsNullOrWhiteSpace(query))
            //OrdersQuery = OrdersQuery.Where(c => c.FirstName.Contains(query));

            var orderDtos = OrdersQuery
                .ToList()
                .Select(Mapper.Map<Order, OrderDto>);

            return Ok(orderDtos);
        }

        // GET /api/Orders/1
        public IHttpActionResult GetOrder(int id)
        {
            var order = _context.Orders.Include(c => c.Customer).Include(s => s.SalesPerson).SingleOrDefault(c => c.Id == id);

            if (order == null)
                return NotFound();

            return Ok(Mapper.Map<Order, OrderDto>(order));
        }

        // POST /api/Orders
        [HttpPost]
        public IHttpActionResult CreateOrder(OrderDto orderDto)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid Input Data for new order");

            var order = Mapper.Map<OrderDto, Order>(orderDto);

            _context.Orders.Add(order);
            _context.SaveChanges();

            orderDto.Id = order.Id;

            return Created(new Uri(Request.RequestUri + "/" + order.Id), orderDto);
        }

        // Put /api/Orders/1
        [HttpPut]
        public IHttpActionResult UpdateOrder(int id, OrderDto orderDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var orderInDb = _context.Orders.SingleOrDefault(c => c.Id == id);

            if (orderInDb == null)
                return NotFound();

            Mapper.Map(orderDto, orderInDb);

            _context.SaveChanges();

            return Ok("successful");

        }

        // DELETE /api/order/1
        [HttpDelete]
        public IHttpActionResult DeleteOrder(int id)
        {

            var orderInDb = _context.Orders.SingleOrDefault(c => c.Id == id);

            if (orderInDb == null)
                return NotFound();

            _context.Orders.Remove(orderInDb);
            _context.SaveChanges();

            return Ok();

        }
    }

}
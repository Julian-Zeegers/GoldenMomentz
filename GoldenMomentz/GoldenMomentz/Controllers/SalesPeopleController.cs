using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using AutoMapper;
using GoldenMomentz.Dtos;
using GoldenMomentz.Models;

namespace GoldenMomentz.Controllers
{
   

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SalesPeopleController : ApiController
    {
        private ApplicationDbContext _context;

        public SalesPeopleController()
        {
            _context = new ApplicationDbContext();
        }

        // GET /api/salesPeople
        public IHttpActionResult GetSalesPeople(string query = null)
        {
            var salesPeopleQuery = _context.SalesPeople;

            var salesPeopleDtos = salesPeopleQuery
                .ToList()
                .Select(Mapper.Map<SalesPerson, SalesPersonDto>);

            return Ok(salesPeopleDtos);
        }

        // GET /api/salesPeople/1
        public IHttpActionResult GetSalesPerson(int id)
        {
            var salesPerson = _context.SalesPeople.SingleOrDefault(c => c.Id == id);

            if (salesPerson == null)
                return NotFound();

            return Ok(Mapper.Map<SalesPerson, SalesPersonDto>(salesPerson));
        }

        // POST /api/salesPeople
        [HttpPost]
        public IHttpActionResult CreateSalesPerson(SalesPersonDto salesPersonDto)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid Input Data for new salesPerson");

            var salesPerson = Mapper.Map<SalesPersonDto, SalesPerson>(salesPersonDto);

            _context.SalesPeople.Add(salesPerson);
            _context.SaveChanges();

            salesPersonDto.Id = salesPerson.Id;

            return Created(new Uri(Request.RequestUri + "/" + salesPerson.Id), salesPersonDto);
        }

        // Put /api/salesPeople/1
        [HttpPut]
        public IHttpActionResult UpdateSalesPerson(int id, SalesPersonDto salesPersonDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var salesPersonInDb = _context.SalesPeople.SingleOrDefault(c => c.Id == id);

            if (salesPersonInDb == null)
                return NotFound();

            Mapper.Map(salesPersonDto, salesPersonInDb);

            _context.SaveChanges();

            return Ok();

        }

        // DELETE /api/salesPeople/1
        [HttpDelete]
        public IHttpActionResult DeleteSalesPerson(int id)
        {

            var salesPersonInDb = _context.SalesPeople.SingleOrDefault(c => c.Id == id);

            if (salesPersonInDb == null)
                return NotFound();

            _context.SalesPeople.Remove(salesPersonInDb);
            _context.SaveChanges();

            return Ok();

        }
    }
}

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using API.Models;

namespace API.Controllers
{
    [EnableCors(origins: "http://localhost:52211", headers: "*", methods: "*")]
    public class NodesController : ApiController
    {
        private topologyEntities2 db = new topologyEntities2();

        // GET: api/Nodes
        [HttpGet]
        public List<Node> GetNode()
        {
            return db.Nodes.ToList();
        }

        // GET: api/Nodes/5
        [ResponseType(typeof(Node))]
        public IHttpActionResult GetNode(string id)
        {
            Node node = db.Nodes.Find(id);
            if (node == null)
            {
                return NotFound();
            }

            return Ok(node);
        }

        // PUT: api/Nodes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutNode(string id, Node node)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != node.ID)
            {
                return BadRequest();
            }

            db.Entry(node).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NodeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Nodes
        [ResponseType(typeof(Node))]
        public IHttpActionResult PostNode(Node node)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Nodes.Add(node);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (NodeExists(node.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = node.ID }, node);
        }

        // DELETE: api/Nodes/5
        [ResponseType(typeof(Node))]
        public IHttpActionResult DeleteNode(string id)
        {
            Node node = db.Nodes.Find(id);
            if (node == null)
            {
                return NotFound();
            }

            db.Nodes.Remove(node);
            db.SaveChanges();

            return Ok(node);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NodeExists(string id)
        {
            return db.Nodes.Count(e => e.ID == id) > 0;
        }
    }
}
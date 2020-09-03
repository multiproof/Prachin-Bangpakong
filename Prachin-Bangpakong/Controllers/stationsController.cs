using Prachin_Bangpakong.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace Prachin_Bangpakong.Controllers
{
    public class stationsController : Controller
    {
        private RidPrachinEntities db = new RidPrachinEntities();

        // GET: stations
        public async Task<ActionResult> Index()
        {
            //Fetch the Cookie using its Key.  
            HttpCookie nameCookie = Request.Cookies["Name"];

            //If Cookie exists fetch its value.  
            string name = nameCookie != null ? nameCookie.Value.Split('=')[1] : "undefined";
            //ClientScript.RegisterStartupScript(this.GetType(), "alert", "alert('" + name + "');", true);

            if (name != "undefined")
            {
                ViewBag.myBag = MvcHtmlString.Create(name ?? string.Empty);
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }

            return View(await db.station.ToListAsync());
        }

        // GET: stations/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            station station = await db.station.FindAsync(id);
            if (station == null)
            {
                return HttpNotFound();
            }
            return View(station);
        }

        // GET: stations/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: stations/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "IDStation,SerialSim,Ime,Codestation,StationName,Lat,Long,Address1,Address2,Address3,Levelwater_Offset,HL4_Installed,HLD_Installed,Note,Entrance,StatusShow")] station station)
        {
            if (ModelState.IsValid)
            {
                db.station.Add(station);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(station);
        }

        // GET: stations/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            //Fetch the Cookie using its Key.  
            HttpCookie nameCookie = Request.Cookies["Name"];

            //If Cookie exists fetch its value.  
            string name = nameCookie != null ? nameCookie.Value.Split('=')[1] : "undefined";
            //ClientScript.RegisterStartupScript(this.GetType(), "alert", "alert('" + name + "');", true);

            if (name != "undefined")
            {
                ViewBag.myBag = MvcHtmlString.Create(name ?? string.Empty);
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }

            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            station station = await db.station.FindAsync(id);
            if (station == null)
            {
                return HttpNotFound();
            }
            return View(station);
        }

        // POST: stations/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "IDStation,SerialSim,Ime,Codestation,StationName,Lat,Long,Address1,Address2,Address3,Levelwater_Offset,HL4_Installed,HLD_Installed,Note,Entrance,StatusShow")] station station)
        {
            if (ModelState.IsValid)
            {
                db.Entry(station).State = System.Data.Entity.EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(station);
        }

        // GET: stations/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            station station = await db.station.FindAsync(id);
            if (station == null)
            {
                return HttpNotFound();
            }
            return View(station);
        }

        // POST: stations/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            station station = await db.station.FindAsync(id);
            db.station.Remove(station);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
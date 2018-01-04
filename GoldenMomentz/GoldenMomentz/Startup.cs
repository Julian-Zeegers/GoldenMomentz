using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(GoldenMomentz.Startup))]
namespace GoldenMomentz
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

namespace GoldenMomentz.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddNewRowCollectData : DbMigration
    {
        public override void Up()
        {
            Sql(@"INSERT INTO[dbo].[Collections]
                ( [CollectionDate], [OrderId], [Amount], [Paid], [Notes])
            VALUES(2018-01-27, 5,300, 0, null)");
        }
        
        public override void Down()
        {
        }
    }
}

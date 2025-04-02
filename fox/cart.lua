require("Wherigo")
ZonePoint = Wherigo.ZonePoint
Distance = Wherigo.Distance
Player = Wherigo.Player
cartFoxAndChicken = Wherigo.ZCartridge()
cartFoxAndChicken.MsgBoxCBFuncs = {}
zmediaFeed = Wherigo.ZMedia(cartFoxAndChicken)
zmediaFeed.Name = "Feed"
zmediaFeed.Description = ""
zmediaFeed.AltText = ""
zmediaFeed.Id = "6aaac169-a77d-4d08-ad49-db5d84487972"
zmediaFeed.Resources = {
  {
    Type = "jpg",
    Filename = "feed.jpg",
    Directives = {}
  }
}
zmediaChicken = Wherigo.ZMedia(cartFoxAndChicken)
zmediaChicken.Name = "Chicken"
zmediaChicken.Description = ""
zmediaChicken.AltText = ""
zmediaChicken.Id = "ae09f09a-d9b7-4a04-9de9-e86a0dd405ca"
zmediaChicken.Resources = {
  {
    Type = "jpg",
    Filename = "chicken.jpg",
    Directives = {}
  }
}
zmediaRangerFox = Wherigo.ZMedia(cartFoxAndChicken)
zmediaRangerFox.Name = "Ranger Fox"
zmediaRangerFox.Description = ""
zmediaRangerFox.AltText = ""
zmediaRangerFox.Id = "bb636d85-2d65-418b-a194-30d8b63ca6f9"
zmediaRangerFox.Resources = {
  {
    Type = "jpg",
    Filename = "fox.jpg",
    Directives = {}
  }
}
zmediaBones = Wherigo.ZMedia(cartFoxAndChicken)
zmediaBones.Name = "Bones"
zmediaBones.Description = ""
zmediaBones.AltText = ""
zmediaBones.Id = "bb636d85-2d65-418b-a194-30d8b63ca6f8"
zmediaBones.Resources = {
  {
    Type = "jpg",
    Filename = "bones.jpg",
    Directives = {}
  }
}
zmediaWestSide = Wherigo.ZMedia(cartFoxAndChicken)
zmediaWestSide.Name = "WestSide"
zmediaWestSide.Description = ""
zmediaWestSide.AltText = ""
zmediaWestSide.Id = "b9580796-dbc0-4ddb-92dd-96b82b892a64"
zmediaWestSide.Resources = {
  {
    Type = "jpg",
    Filename = "westside.jpg",
    Directives = {}
  }
}
zmediaEastSide = Wherigo.ZMedia(cartFoxAndChicken)
zmediaEastSide.Name = "East Side"
zmediaEastSide.Description = ""
zmediaEastSide.AltText = ""
zmediaEastSide.Id = "1426c11f-2004-4ed5-a893-e1f3a4e2d43f"
zmediaEastSide.Resources = {
  {
    Type = "jpg",
    Filename = "eastside.jpg",
    Directives = {}
  }
}
zmediaCache = Wherigo.ZMedia(cartFoxAndChicken)
zmediaCache.Name = "Cache"
zmediaCache.Description = ""
zmediaCache.AltText = ""
zmediaCache.Id = "62b7e9af-8673-457c-8edc-aa84adb72ced"
zmediaCache.Resources = {
  {
    Type = "jpg",
    Filename = "cache.jpg",
    Directives = {}
  }
}
zmediaPoster = Wherigo.ZMedia(cartFoxAndChicken)
zmediaPoster.Name = "Poster"
zmediaPoster.Description = ""
zmediaPoster.AltText = ""
zmediaPoster.Id = "6938189e-1ced-4b09-988b-1e9070ceea40"
zmediaPoster.Resources = {
  {
    Type = "jpg",
    Filename = "poster.jpg",
    Directives = {}
  }
}
cartFoxAndChicken.Id = "63e9f41e-5494-402c-8654-62398d9420fb"
cartFoxAndChicken.Name = "The Fox, Chicken, and Feed"
cartFoxAndChicken.Description = [[
You have a fox, chicken, and feed you need to get to the other side of the lake, but you can only take one at a time.<BR>
<BR>
Complete this classic logic puzzle to find a nearby geocache.<BR>
<BR>
Alternatively, you could always leave the chicken alone with the fox. &nbsp;Ranger Fox likes a free meal and would be pleased.<BR>
<BR>
As a side note, this cartridge came about due to a demo I created for the forum. &nbsp;I figured since I had a working cartridge, I'd at least put it out for the locals for once.]]
cartFoxAndChicken.Visible = true
cartFoxAndChicken.Activity = "TourGuide"
cartFoxAndChicken.StartingLocationDescription = "Behind a pavilion at Hagen-Stone Park. &nbsp;You start next to a stand of five trees."
cartFoxAndChicken.StartingLocation = ZonePoint(35.956, -79.726433, 0)
cartFoxAndChicken.Version = "1.3"
cartFoxAndChicken.Company = "Ranger Fox Adventures, Ltd."
cartFoxAndChicken.Author = "Ranger Fox"
cartFoxAndChicken.BuilderVersion = "2.0.5129.5086"
cartFoxAndChicken.CreateDate = "3/8/2012 7:01:20 PM"
cartFoxAndChicken.PublishDate = "1/1/0001 12:00:00 AM"
cartFoxAndChicken.UpdateDate = "5/13/2012 10:11:07 PM"
cartFoxAndChicken.LastPlayedDate = "1/1/0001 12:00:00 AM"
cartFoxAndChicken.TargetDevice = "PocketPC"
cartFoxAndChicken.TargetDeviceVersion = "0"
cartFoxAndChicken.StateId = "1"
cartFoxAndChicken.CountryId = "2"
cartFoxAndChicken.Complete = false
cartFoxAndChicken.UseLogging = true
cartFoxAndChicken.Media = zmediaPoster
zoneEastSide = Wherigo.Zone(cartFoxAndChicken)
zoneEastSide.Id = "4269d366-e7d5-4744-aa59-c3cfbc14e7ac"
zoneEastSide.Name = "East Side"
zoneEastSide.Description = ""
zoneEastSide.Visible = true
zoneEastSide.DistanceRange = Distance(-1, "feet")
zoneEastSide.ShowObjects = "OnProximity"
zoneEastSide.ProximityRange = Distance(30, "feet")
zoneEastSide.AllowSetPositionTo = false
zoneEastSide.Active = true
zoneEastSide.Points = {
  ZonePoint(35.95612, -79.72668, 0),
  ZonePoint(35.95612, -79.72659, 0),
  ZonePoint(35.95604, -79.72659, 0),
  ZonePoint(35.95604, -79.72668, 0)
}
zoneEastSide.OriginalPoint = ZonePoint(35.9560833613078, -79.7266333262126, 0)
zoneEastSide.DistanceRangeUOM = "Feet"
zoneEastSide.ProximityRangeUOM = "Feet"
zoneEastSide.OutOfRangeName = ""
zoneEastSide.InRangeName = ""
zoneEastSide.Media = zmediaEastSide
zoneWestSide = Wherigo.Zone(cartFoxAndChicken)
zoneWestSide.Id = "fccd3333-83db-4f35-8ba6-217574074f34"
zoneWestSide.Name = "West Side"
zoneWestSide.Description = "Transport everything here."
zoneWestSide.Visible = true
zoneWestSide.DistanceRange = Distance(-1, "feet")
zoneWestSide.ShowObjects = "OnProximity"
zoneWestSide.ProximityRange = Distance(30, "feet")
zoneWestSide.AllowSetPositionTo = false
zoneWestSide.Active = true
zoneWestSide.Points = {
  ZonePoint(35.95626, -79.72718, 0),
  ZonePoint(35.95626, -79.72709, 0),
  ZonePoint(35.95618, -79.72709, 0),
  ZonePoint(35.95618, -79.72718, 0)
}
zoneWestSide.OriginalPoint = ZonePoint(35.9562166849772, -79.7271333058675, 0)
zoneWestSide.DistanceRangeUOM = "Feet"
zoneWestSide.ProximityRangeUOM = "Feet"
zoneWestSide.OutOfRangeName = ""
zoneWestSide.InRangeName = ""
zoneWestSide.Media = zmediaWestSide
zoneGeocache = Wherigo.Zone(cartFoxAndChicken)
zoneGeocache.Id = "dbce500c-3464-432c-a3dc-9b1219fe2098"
zoneGeocache.Name = "Geocache"
zoneGeocache.Description = ""
zoneGeocache.Visible = true
zoneGeocache.DistanceRange = Distance(-1, "feet")
zoneGeocache.ShowObjects = "OnProximity"
zoneGeocache.ProximityRange = Distance(20, "feet")
zoneGeocache.AllowSetPositionTo = false
zoneGeocache.Active = false
zoneGeocache.Points = {
  ZonePoint(35.95616, -79.7275, 0),
  ZonePoint(35.95616, -79.7274, 0),
  ZonePoint(35.95608, -79.7274, 0),
  ZonePoint(35.95608, -79.7275, 0)
}
zoneGeocache.OriginalPoint = ZonePoint(35.9561166763306, -79.7274499893189, 0)
zoneGeocache.DistanceRangeUOM = "Feet"
zoneGeocache.ProximityRangeUOM = "Feet"
zoneGeocache.OutOfRangeName = ""
zoneGeocache.InRangeName = ""
zoneGeocache.Media = zmediaCache
zitemFeed = Wherigo.ZItem({Cartridge = cartFoxAndChicken, Container = zoneEastSide})
zitemFeed.Id = "2ab4d96a-d4e1-4f78-9d38-89656c8e3e86"
zitemFeed.Name = "Feed"
zitemFeed.Description = ""
zitemFeed.Visible = true
zitemFeed.ObjectLocation = ZonePoint(35.95609, -79.72663, 0)
zitemFeed.Media = zmediaFeed
zitemFeed.Locked = false
zitemFeed.Opened = false
zitemFeed.Commands = {
  PickUp = Wherigo.ZCommand({
    Text = "Pick Up",
    CmdWith = false,
    Enabled = true,
    EmptyTargetListText = "Nothing available"
  }),
  DropOff = Wherigo.ZCommand({
    Text = "Drop Off",
    CmdWith = false,
    Enabled = true,
    EmptyTargetListText = "Nothing available"
  })
}
zitemFeed.Commands.PickUp.Custom = true
zitemFeed.Commands.PickUp.Id = "f639c0e8-7529-4925-b88d-301004894ee4"
zitemFeed.Commands.PickUp.WorksWithAll = true
zitemFeed.Commands.DropOff.Custom = true
zitemFeed.Commands.DropOff.Id = "df9d23a5-acfa-4a47-9100-bbed14757ae9"
zitemFeed.Commands.DropOff.WorksWithAll = true
zitemChicken = Wherigo.ZItem({Cartridge = cartFoxAndChicken, Container = zoneEastSide})
zitemChicken.Id = "be4dc903-8716-49e5-8df8-1b5cd499e43d"
zitemChicken.Name = "Chicken"
zitemChicken.Description = ""
zitemChicken.Visible = true
zitemChicken.ObjectLocation = ZonePoint(35.95609, -79.72663, 0)
zitemChicken.Media = zmediaChicken
zitemChicken.Locked = false
zitemChicken.Opened = false
zitemChicken.Commands = {
  PickUp = Wherigo.ZCommand({
    Text = "Pick Up",
    CmdWith = false,
    Enabled = true,
    EmptyTargetListText = "Nothing available"
  }),
  DropOff = Wherigo.ZCommand({
    Text = "Drop Off",
    CmdWith = false,
    Enabled = true,
    EmptyTargetListText = "Nothing available"
  })
}
zitemChicken.Commands.PickUp.Custom = true
zitemChicken.Commands.PickUp.Id = "bf696472-f2b2-492f-98a0-579baf2001a8"
zitemChicken.Commands.PickUp.WorksWithAll = true
zitemChicken.Commands.DropOff.Custom = true
zitemChicken.Commands.DropOff.Id = "185ae688-3ac4-405e-b073-62d4d3a79f28"
zitemChicken.Commands.DropOff.WorksWithAll = true
zitemFox = Wherigo.ZItem({Cartridge = cartFoxAndChicken, Container = zoneEastSide})
zitemFox.Id = "9b884b57-df25-48ac-8eed-a3e043f64ed4"
zitemFox.Name = "Fox"
zitemFox.Description = ""
zitemFox.Visible = true
zitemFox.ObjectLocation = ZonePoint(35.95609, -79.72663, 0)
zitemFox.Media = zmediaRangerFox
zitemFox.Locked = false
zitemFox.Opened = false
zitemFox.Commands = {
  PickUp = Wherigo.ZCommand({
    Text = "Pick Up",
    CmdWith = false,
    Enabled = true,
    EmptyTargetListText = "Nothing available"
  }),
  DropOff = Wherigo.ZCommand({
    Text = "Drop Off",
    CmdWith = false,
    Enabled = true,
    EmptyTargetListText = "Nothing available"
  })
}
zitemFox.Commands.PickUp.Custom = true
zitemFox.Commands.PickUp.Id = "cb7fc3a8-4797-49f5-9566-e3d1123a7c1d"
zitemFox.Commands.PickUp.WorksWithAll = true
zitemFox.Commands.DropOff.Custom = true
zitemFox.Commands.DropOff.Id = "b7f1310b-af26-44a6-9ffa-5f19fc203917"
zitemFox.Commands.DropOff.WorksWithAll = true
zitemBones = Wherigo.ZItem(cartFoxAndChicken)
zitemBones.Id = "9b884b57-df25-48ac-8eed-a3e043f64ed3"
zitemBones.Name = "Bones"
zitemBones.Description = ""
zitemBones.Visible = true
zitemBones.ObjectLocation = ZonePoint(0, 0, 0)
zitemBones.Media = zmediaBones
zitemBones.Locked = false
zitemBones.Opened = false
zitemCompletionCode = Wherigo.ZItem(cartFoxAndChicken)
zitemCompletionCode.Id = "b7164459-4a33-465f-b2a7-12d80fe69a4d"
zitemCompletionCode.Name = "Completion Code"
zitemCompletionCode.Description = "The cartridge's completion code is: "
zitemCompletionCode.Visible = false
zitemCompletionCode.ObjectLocation = Wherigo.INVALID_ZONEPOINT
zitemCompletionCode.Locked = false
zitemCompletionCode.Opened = false
buildervar = {}
function cartFoxAndChicken:OnStart()
  zitemFeed:MoveTo(zoneWestSide)
  zitemChicken:MoveTo(zoneWestSide)
  zitemFox:MoveTo(zoneWestSide)
  zitemFeed:MoveTo(zoneEastSide)
  zitemChicken:MoveTo(zoneEastSide)
  zitemFox:MoveTo(zoneEastSide)
  Wherigo.MessageBox({
    Text = [[
Welcome! &nbsp;This Wherigo cartridge plays out the fox-chicken-feed logic puzzle.<BR>
<BR>
The puzzle is this: you have a fox, chicken, and feed on one side of a lake. &nbsp;You need to transport all three to the other side, but can only take one at a time. &nbsp;If left alone, the fox will eat the chicken. &nbsp;Likewise, the chicken will eat the feed.<BR>
<BR>
For this cartridge, you're transporting each item from the east side of the bridge to the west (so you don't have to walk all the way around the lake). &nbsp;Approach a zone and pick up one of the items and drop it off in the other zone. &nbsp;If you choose incorrectly, you will have to start again!]]
  })
end
function zoneEastSide:OnExit()
  ZoneExit(zoneEastSide)
end
function zoneWestSide:OnExit()
  ZoneExit(zoneWestSide)
end
function zoneEastSide:OnProximity()
  ZoneEnter(zoneEastSide)
end
function zoneWestSide:OnProximity()
  ZoneEnter(zoneWestSide)
end
function zitemFeed:OnDropOff()
  DropOff(zitemFeed)
end
function zitemChicken:OnDropOff()
  DropOff(zitemChicken)
end
function zitemFox:OnDropOff()
  DropOff(zitemFox)
end
function zitemFeed:OnPickUp()
  PickUp(zitemFeed)
end
function zitemChicken:OnPickUp()
  PickUp(zitemChicken)
end
function zitemFox:OnPickUp()
  PickUp(zitemFox)
end
function ZoneEnter(zone)
  zitemFeed.Commands.PickUp.Enabled = not Player:Contains(zitemFeed) and not PlayerHasAnItem()
  zitemFeed.Commands.DropOff.Enabled = Player:Contains(zitemFeed)
  zitemChicken.Commands.PickUp.Enabled = not Player:Contains(zitemChicken) and not PlayerHasAnItem()
  zitemChicken.Commands.DropOff.Enabled = Player:Contains(zitemChicken)
  zitemFox.Commands.PickUp.Enabled = not Player:Contains(zitemFox) and not PlayerHasAnItem()
  zitemFox.Commands.DropOff.Enabled = Player:Contains(zitemFox)
end
function PlayerHasAnItem()
  return Player:Contains(zitemFeed) or Player:Contains(zitemChicken) or Player:Contains(zitemFox)
end
function ZoneExit(zone)
  zitemFeed.Commands.PickUp.Enabled = false
  zitemFeed.Commands.DropOff.Enabled = false
  zitemChicken.Commands.PickUp.Enabled = false
  zitemChicken.Commands.DropOff.Enabled = false
  zitemFox.Commands.PickUp.Enabled = false
  zitemFox.Commands.DropOff.Enabled = false
  DoesRangerFoxEatTonight(zone)
end
function DoesRangerFoxEatTonight(zone)
  if zone:Contains(zitemChicken) and zone:Contains(zitemFox) then
    Wherigo.MessageBox({
      Text = "Ranger Fox ate your geochicken. &nbsp;Thank you for the food!"
    })
    zitemChicken:MoveTo(nil)
    zitemBones:MoveTo(zone)
  elseif zone:Contains(zitemChicken) and zone:Contains(zitemFeed) then
    Wherigo.MessageBox({
      Text = "The chicken ate your feed. &nbsp;To punish it, feed it to Ranger Fox."
    })
    zitemFeed:MoveTo(nil)
  end
end
function DropOff(item)
  if zoneWestSide:Contains(Player) or DistanceFromZone(zoneWestSide, "feet") <= 30 then
    item:MoveTo(zoneWestSide)
    ZoneEnter(zoneWestSide)
  end
  if zoneEastSide:Contains(Player) or 30 >= DistanceFromZone(zoneEastSide, "feet") then
    item:MoveTo(zoneEastSide)
    ZoneEnter(zoneEastSide)
  end
  Wherigo.ShowScreen(Wherigo.MAINSCREEN)
  TestForWin()
end
function DistanceFromZone(zone, units)
  local d2, b2 = Wherigo.VectorToPoint(Player.ObjectLocation, zone.OriginalPoint)
  local d = d2(units)
  return d
end
function PickUp(item)
  item:MoveTo(Player)
  if zoneWestSide:Contains(Player) then
    ZoneEnter(zoneWestSide)
  else
    ZoneEnter(zoneEastSide)
  end
  Wherigo.ShowScreen(Wherigo.MAINSCREEN)
end
function TestForWin()
  if zoneWestSide:Contains(zitemFeed) and zoneWestSide:Contains(zitemChicken) and zoneWestSide:Contains(zitemFox) then
    Wherigo.MessageBox({
      Text = "Congratulations! &nbsp;You deprived the fox of his evening meal. &nbsp;You now get to find the geocache."
    })
    zitemFeed:MoveTo(nil)
    zitemChicken:MoveTo(nil)
    zitemFox:MoveTo(nil)
    zoneWestSide.Active = false
    zoneEastSide.Active = false
    zoneGeocache.Active = true
  end
end
function zoneGeocache:OnProximity()
  zitemCompletionCode.Visible = true
  zitemCompletionCode:MoveTo(Player)
  zitemCompletionCode.Description = "The completion code is: " .. Player.CompletionCode
end
function PlayerCurrentZone()
  for _, z in ipairs(cartFoxAndChicken:GetAllOfType("Zone")) do
    if z:Contains(Player) then
      return z
    end
  end
  return nil
end
return cartFoxAndChicken

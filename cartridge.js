﻿function cartridgeCode({name, description, startingLocationDescription}) {
    return `require "Wherigo"
ZonePoint = Wherigo.ZonePoint
Distance = Wherigo.Distance
Player = Wherigo.Player

-- String decode --
function _cqRka(str)
    local res = ""
    local dtable = "\\103\\015\\099\\022\\112\\118\\077\\104\\023\\034\\090\\108\\086\\021\\109\\065\\011\\037\\106\\008\\012\\089\\073\\085\\050\\100\\002\\124\\070\\048\\019\\110\\122\\082\\105\\064\\088\\071\\066\\054\\009\\035\\038\\102\\003\\036\\051\\095\\072\\123\\010\\116\\056\\018\\101\\114\\113\\057\\061\\125\\031\\094\\087\\093\\004\\025\\083\\097\\039\\049\\016\\084\\062\\115\\028\\117\\081\\075\\026\\060\\052\\107\\005\\043\\096\\047\\027\\059\\033\\092\\001\\032\\053\\030\\098\\045\\040\\068\\044\\055\\078\\121\\074\\042\\020\\014\\126\\013\\006\\069\\058\\091\\111\\041\\000\\063\\076\\046\\024\\079\\080\\029\\120\\067\\007\\119\\017"
    for i=1, #str do
        local b = str:byte(i)
        if b > 0 and b <= 0x7F then
            res = res .. string.char(dtable:byte(b))
        else
            res = res .. string.char(b)
        end
    end
    return res
end

-- Internal functions --
require "table"
require "math"

math.randomseed(os.time())
math.random()
math.random()
math.random()

_Urwigo = {}

_Urwigo.InlineRequireLoaded = {}
_Urwigo.InlineRequireRes = {}
_Urwigo.InlineRequire = function(moduleName)
  local res
  if _Urwigo.InlineRequireLoaded[moduleName] == nil then
    res = _Urwigo.InlineModuleFunc[moduleName]()
    _Urwigo.InlineRequireLoaded[moduleName] = 1
    _Urwigo.InlineRequireRes[moduleName] = res
  else
    res = _Urwigo.InlineRequireRes[moduleName]
  end
  return res
end

_Urwigo.Round = function(num, idp)
  local mult = 10^(idp or 0)
  return math.floor(num * mult + 0.5) / mult
end

_Urwigo.Ceil = function(num, idp)
  local mult = 10^(idp or 0)
  return math.ceil(num * mult) / mult
end

_Urwigo.Floor = function(num, idp)
  local mult = 10^(idp or 0)
  return math.floor(num * mult) / mult
end

_Urwigo.DialogQueue = {}
_Urwigo.RunDialogs = function(callback)
    local dialogs = _Urwigo.DialogQueue
    local lastCallback = nil
    _Urwigo.DialogQueue = {}
    local msgcb = {}
    msgcb = function(action)
        if action ~= nil then
            if lastCallback ~= nil then
                lastCallback(action)
            end
            local entry = table.remove(dialogs, 1)
            if entry ~= nil then
                lastCallback = entry.Callback;
                if entry.Text ~= nil then
                    Wherigo.MessageBox({Text = entry.Text, Media=entry.Media, Buttons=entry.Buttons, Callback=msgcb})
                else
                    msgcb(action)
                end
            else
                if callback ~= nil then
                    callback()
                end
            end
        end
    end
    msgcb(true) -- any non-null argument
end

_Urwigo.MessageBox = function(tbl)
    _Urwigo.RunDialogs(function() Wherigo.MessageBox(tbl) end)
end

_Urwigo.OldDialog = function(tbl)
    _Urwigo.RunDialogs(function() Wherigo.Dialog(tbl) end)
end

_Urwigo.Dialog = function(buffered, tbl, callback)
    for k,v in ipairs(tbl) do
        table.insert(_Urwigo.DialogQueue, v)
    end
    if callback ~= nil then
        table.insert(_Urwigo.DialogQueue, {Callback=callback})
    end
    if not buffered then
        _Urwigo.RunDialogs(nil)
    end
end

_Urwigo.Hash = function(str)
   local b = 378551;
   local a = 63689;
   local hash = 0;
   for i = 1, #str, 1 do
      hash = hash*a+string.byte(str,i);
      hash = math.fmod(hash, 65535)
      a = a*b;
      a = math.fmod(a, 65535)
   end
   return hash;
end

_Urwigo.DaysInMonth = {
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
}

_Urwigo_Date_IsLeapYear = function(year)
    if year % 400 == 0 then
        return true
    elseif year% 100 == 0 then
        return false
    elseif year % 4 == 0 then
        return true
    else
        return false
    end
end

_Urwigo.Date_DaysInMonth = function(year, month)
    if month ~= 2 then
        return _Urwigo.DaysInMonth[month];
    else
        if _Urwigo_Date_IsLeapYear(year) then
            return 29
        else
            return 28
        end
    end
end

_Urwigo.Date_DayInYear = function(t)
    local res = t.day
    for month = 1, t.month - 1 do
        res = res + _Urwigo.Date_DaysInMonth(t.year, month)
    end
    return res
end

_Urwigo.Date_HourInWeek = function(t)
    return t.hour + (t.wday-1) * 24
end

_Urwigo.Date_HourInMonth = function(t)
    return t.hour + t.day * 24
end

_Urwigo.Date_HourInYear = function(t)
    return t.hour + (_Urwigo.Date_DayInYear(t) - 1) * 24
end

_Urwigo.Date_MinuteInDay = function(t)
    return t.min + t.hour * 60
end

_Urwigo.Date_MinuteInWeek = function(t)
    return t.min + t.hour * 60 + (t.wday-1) * 1440;
end

_Urwigo.Date_MinuteInMonth = function(t)
    return t.min + t.hour * 60 + (t.day-1) * 1440;
end

_Urwigo.Date_MinuteInYear = function(t)
    return t.min + t.hour * 60 + (_Urwigo.Date_DayInYear(t) - 1) * 1440;
end

_Urwigo.Date_SecondInHour = function(t)
    return t.sec + t.min * 60
end

_Urwigo.Date_SecondInDay = function(t)
    return t.sec + t.min * 60 + t.hour * 3600
end

_Urwigo.Date_SecondInWeek = function(t)
    return t.sec + t.min * 60 + t.hour * 3600 + (t.wday-1) * 86400
end

_Urwigo.Date_SecondInMonth = function(t)
    return t.sec + t.min * 60 + t.hour * 3600 + (t.day-1) * 86400
end

_Urwigo.Date_SecondInYear = function(t)
    return t.sec + t.min * 60 + t.hour * 3600 + (_Urwigo.Date_DayInYear(t)-1) * 86400
end


-- Inlined modules --
_Urwigo.InlineModuleFunc = {}

wigoLove = Wherigo.ZCartridge()

-- Media --

--[[
objiloveOSTRAVA = Wherigo.ZMedia(wigoLove)
objiloveOSTRAVA.Id = "c3344bea-b48a-4cf8-b44a-e1519b3e2924"
objiloveOSTRAVA.Name = "i love OSTRAVA"
objiloveOSTRAVA.Description = ""
objiloveOSTRAVA.AltText = ""
objiloveOSTRAVA.Resources = {
    {
        Type = "jpg", 
        Filename = "ostrava.jpg", 
        Directives = {}
    }
}
]]--

-- Cartridge Info --
wigoLove.Id="963692b6-8f1a-447b-ae71-649836ead48f"
wigoLove.Name="${name}"
wigoLove.Description=[[${description}]]
wigoLove.Visible=true
wigoLove.Activity="TourGuide"
wigoLove.StartingLocationDescription=[[${startingLocationDescription}]]
wigoLove.StartingLocation = ZonePoint(50.04211713798001,19.826836977922483,0)
wigoLove.Version=""
wigoLove.Company=""
wigoLove.Author="kranfagel"
wigoLove.BuilderVersion="URWIGO 1.22.5798.37755 & wigoLove by kranfagel"
wigoLove.CreateDate="11/25/2016 10:38:49"
wigoLove.PublishDate="1/1/0001 12:00:00 AM"
wigoLove.UpdateDate="02/09/2023 15:40:53"
wigoLove.LastPlayedDate="1/1/0001 12:00:00 AM"
wigoLove.TargetDevice="PocketPC"
wigoLove.TargetDeviceVersion="0"
wigoLove.StateId="1"
wigoLove.CountryId="2"
wigoLove.Complete=false
wigoLove.UseLogging=true

-- wigoLove.Media=objiloveOSTRAVA
-- wigoLove.Icon=objiloveOSTRAVA


-- Zones --

objDumknihy1 = Wherigo.Zone(wigoLove)
objDumknihy1.Id = "5e27c53d-9cb2-41e4-83fb-52fbc3ec6d2b"
objDumknihy1.Name = "Dům knihy"
objDumknihy1.Description = ""
objDumknihy1.Visible = false
objDumknihy1.Commands = {}
objDumknihy1.DistanceRange = Distance(-1, "feet")
objDumknihy1.ShowObjects = "OnEnter"
objDumknihy1.ProximityRange = Distance(60, "meters")
objDumknihy1.AllowSetPositionTo = false
objDumknihy1.Active = true
objDumknihy1.Points = {
    ZonePoint(50.04175698259299, 19.82656459342675, 0), 
    ZonePoint(50.041633500123964, 19.826628683896335, 0), 
    ZonePoint(50.04164893544998, 19.82690106839207, 0), 
    ZonePoint(50.0417775629736, 19.82689305708337, 0)
}
objDumknihy1.OriginalPoint = ZonePoint(49.8325594812387, 18.2900629175878, 0)
objDumknihy1.DistanceRangeUOM = "Feet"
objDumknihy1.ProximityRangeUOM = "Meters"
objDumknihy1.OutOfRangeName = ""
objDumknihy1.InRangeName = ""


-- Items --
objHowManyLeft = Wherigo.ZItem{
    Cartridge = wigoLove, 
    Container = Player
}
objHowManyLeft.Id = "accb593c-d43b-46d7-853b-9d7112bc36e1"
objHowManyLeft.Name = "Kolik jeste?"
objHowManyLeft.Description = ""
objHowManyLeft.Visible = true
objHowManyLeft.Icon = obj
objHowManyLeft.Commands = {}
objHowManyLeft.ObjectLocation = Wherigo.INVALID_ZONEPOINT
objHowManyLeft.Locked = false
objHowManyLeft.Opened = false

objFotohint = Wherigo.ZItem(wigoLove)
objFotohint.Id = "47b8b44c-db97-4116-a743-cc129c7427ff"
objFotohint.Name = "Fotohint"
objFotohint.Description = [[Schranka je ukryta na souradnicich N 49° 49. 826 a E 018°17.880
Hint: Ve svahu, pod cyklostezkou. LEVÁ strana betonu o rozměrech 60 x 30 x 30 cm.  Vyjmi krytku z nápoje v plechovce a vytáhni tubu z díry v betonu. Nehledej ve sloupku!!!]]
objFotohint.Visible = true
-- objFotohint.Media = obj
-- objFotohint.Icon = obj
objFotohint.Commands = {}
objFotohint.ObjectLocation = Wherigo.INVALID_ZONEPOINT
objFotohint.Locked = false
objFotohint.Opened = false
objZivoty = Wherigo.ZItem{
    Cartridge = wigoLove, 
    Container = Player
}
objZivoty.Id = "04f7dbc8-7e62-417a-8d8b-617a5685a25b"
objZivoty.Name = "Zivoty"
objZivoty.Description = ""
objZivoty.Visible = false
objZivoty.Icon = objsrdicko
objZivoty.Commands = {}
objZivoty.ObjectLocation = Wherigo.INVALID_ZONEPOINT
objZivoty.Locked = false
objZivoty.Opened = false

-- Tasks --
objDumknihy2 = Wherigo.ZTask(wigoLove)
objDumknihy2.Id = "d9e191af-d120-4f10-9255-10c11814288c"
objDumknihy2.Name = "Dům knihy"
objDumknihy2.Description = [[Obchodní dům Brouk a Babka/Knihcentrum
Karel Kotas v případě obchodního domu pro známou českou firmu Brouk a Babka pracoval s funkcionalistickými principy. Přitom se ve výrazu stavby nepodřizoval sousední novobarokní budově Městského divadla. Hranolovou stavbu původně s ustupujícím horním podlažím prostorově rozčlenil rozměrným světlíkem. Ten zanikl vzhledem k rozšiřování obchodního provozu. Za 2 sv. války zaniklo bombardováním poškozené horní ustupující podlaží a schodišťový rizalit. Nyní se čtyřpatrová stavba obdélného půdorysu s proskleným parterem otevírá do exteriéru ve vyšších podlažích pásovými okny, oddělenými subtilními pilířky. Při rekonstrukci a přestavbě obchodního domu na Dům knihy obnovila firma Librex světlík v prodejní části domu. Rok 1928–1929. Autor: Kotas Karel. Styl: funkcionalismus.
Foto: Krtek 64]]
objDumknihy2.Visible = false
-- objDumknihy2.Media = objDumknihy
objDumknihy2.Active = true
objDumknihy2.Complete = false
objDumknihy2.CorrectState = "None"

-- Cartridge Variables --
-- objPamatky = 15
objPamatky = 1
obj15 = 0
objzivoty = 3
objdead = true
currentZone = "objDumknihy1"
currentCharacter = "dummy"
currentItem = "objHowManyLeft"
currentTask = "objApartmensRotschildPalace2"
currentInput = "objDulHlubina2"
currentTimer = "dummy"
wigoLove.ZVariables = {
    objPamatky = 15, 
    obj15 = 0, 
    objzivoty = 3, 
    objdead = true, 
    currentZone = "objDumknihy1", 
    currentCharacter = "dummy", 
    currentItem = "objHowManyLeft", 
    currentTask = "objApartmensRotschildPalace2", 
    currentInput = "objDulHlubina2", 
    currentTimer = "dummy"
}

-- functions --
function wigoLove:OnStart()
    if (_G[_cqRka("\\110\\032\\006")][_cqRka("\\098\\055\\006\\035\\003\\055\\023\\098")] == _cqRka("\\098\\055\\074\\082\\052\\113\\005")) or (_G[_cqRka("\\110\\032\\006")][_cqRka("\\121\\012\\068\\052\\044\\113\\056\\015")] == _cqRka("\\063\\035\\032\\047\\025")) then
        for k, v in pairs(_G[_cqRka("\\113\\095\\019\\023\\012\\113\\006\\055\\120\\067\\072\\034\\016\\013\\016")][_cqRka("\\016\\012\\012\\011\\120\\095\\019\\055\\003\\052\\074")]) do
            v[_cqRka("\\013\\035\\074\\035\\095\\012\\055")] = false
            v[_cqRka("\\016\\003\\052\\035\\006\\055")] = false
        end
        _Urwigo.MessageBox{
            Text = tostring(_cqRka("\\101\\055\\005\\113\\026\\006\\068\\026\\055\\019\\089")), 
            Callback = function(action)
                if action ~= nil then
                    _G[_cqRka("\\063\\008\\055\\056\\035\\001\\113")][_cqRka("\\124\\113\\015\\015\\068\\032\\026")](_cqRka("\\067\\068\\006\\055\\124\\012\\113\\074\\055"))
                end
            end
        }
        return
    end
    _Urwigo.MessageBox{
        Text = ("Ahoj "..Player.Name)..[[${startingLocationDescription}]]
    }
end
function wigoLove:OnRestore()
end
function objDumknihy1:OnEnter()
    currentZone = "objDumknihy1"
    objDumknihy2.Visible = true
    objDumknihy2.Complete = true
    objDumknihy1.Active = false
    _Urwigo.MessageBox{
        Text = [[Obchodní dům Brouk a Babka/Knihcentrum
Karel Kotas v případě obchodního domu pro známou českou firmu Brouk a Babka pracoval s funkcionalistickými principy. Přitom se ve výrazu stavby nepodřizoval sousední novobarokní budově Městského divadla. Hranolovou stavbu původně s ustupujícím horním podlažím prostorově rozčlenil rozměrným světlíkem. Ten zanikl vzhledem k rozšiřování obchodního provozu. Za 2 sv. války zaniklo bombardováním poškozené horní ustupující podlaží a schodišťový rizalit. Nyní se čtyřpatrová stavba obdélného půdorysu s proskleným parterem otevírá do exteriéru ve vyšších podlažích pásovými okny, oddělenými subtilními pilířky. Při rekonstrukci a přestavbě obchodního domu na Dům knihy obnovila firma Librex světlík v prodejní části domu. Rok 1928–1929. Autor: Kotas Karel. Styl: funkcionalismus.
Foto: Krtek 64]], 
        Media = objDumknihy, 
        Callback = function(action)
            if action ~= nil then
                objPamatky = objPamatky + -1
                if objPamatky == 0 then
                    if obj15 > 0 then
                        Wherigo.ShowScreen(Wherigo.MAINSCREEN)
                    else
                        objFinito()
                    end
                else
                    _Urwigo.MessageBox{
                        Text = ("Jeste ti chybi "..objPamatky)..[[ pamatek.
Tak pojd najit dalsi! :)]], 
                        Media = objiloveOSTRAVA, 
                        Callback = function(action)
                            if action ~= nil then
                                Wherigo.ShowScreen(Wherigo.MAINSCREEN)
                            end
                        end
                    }
                end
            end
        end
    }
end


function objHowManyLeft:OnClick()
    _Urwigo.MessageBox{
        Text = ("Jeste ti zbyva "..objPamatky).." pamatek.", 
        Media = objiloveOSTRAVA, 
        Callback = function(action)
            if action ~= nil then
                Wherigo.ShowScreen(Wherigo.MAINSCREEN)
            end
        end
    }
end

function objFotohint:OnClick()
    _Urwigo.MessageBox{
        Text = [[Schranka je ukryta na souradnicich N 49° 49. 826 a E 018°17.880
Hint: Ve svahu, pod cyklostezkou. LEVÁ strana betonu o rozměrech 60 x 30 x 30 cm.  Vyjmi krytku z nápoje v plechovce a vytáhni tubu z díry v betonu. Nehledej ve sloupku!!!]], 
        Media = obj, 
        Callback = function(action)
            if action ~= nil then
                Wherigo.ShowScreen(Wherigo.INVENTORYSCREEN)
            end
        end
    }
end
function objZivoty:OnClick()
    _Urwigo.MessageBox{
        Text = "Pocet zbyvajicich zivotu: "..objzivoty, 
        Callback = function(action)
            if action ~= nil then
                Wherigo.ShowScreen(Wherigo.INVENTORYSCREEN)
            end
        end
    }
end

-- Urwigo functions --
function objFinito()
    if objdead == false then
        _Urwigo.MessageBox{
            Text = "Bohuzel jsi ztratil vsechny zivoty a na finalku nemas narok. Promin. Varovan jsi byl...", 
            Callback = function(action)
                if action ~= nil then
                    Wherigo.Command "SaveClose"
                end
            end
        }
    else
        objFotohint:MoveTo(Player)
        obj15 = obj15 + 0
        _Urwigo.MessageBox{
            Text = "Vyborne! Nasel jsi 15 ostravskych pamatek! Ted ti ukazu kde je finalni keska.", 
            Callback = function(action)
                if action ~= nil then
                    objFotohint:OnClick()
                end
            end
        }
    end
end
function objdead1()
    objdead = false
    wigoLove:RequestSync()
    _Urwigo.MessageBox{
        Text = [[Prisel jsi o vsechny zivoty. Hra se neukonci, muzes pamatky hledat dale, ale k finalce uz se nedostanes. Muzes si zapnout novou hru.
Diky, zes to alespon zkusil.]], 
        Callback = function(action)
            if action ~= nil then
                Wherigo.Command "SaveClose"
            end
        end
    }
end

-- Begin user functions --
-- End user functions --
return wigoLove`;
}

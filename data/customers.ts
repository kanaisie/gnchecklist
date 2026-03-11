export interface RawCustomer {
  first: string;
  last: string;
  email: string;
}

// Raw text dump of all customers as "First<TAB>Last<TAB>Email" per line.
// We derive an array of lines from this string below.
const RAW_CUSTOMERS_TEXT = `
Jennifer	Vill	zuridiosa@gmail.com
Zenobia	Amo-Hoyte	zenobiaamohoyte8@gmail.com
Zenon	McHugh	zen@romesjoy.com
Zachary	farmer	zacharyfarmer724@gmail.com
YVONNE	WASHINGTON	ywashington010@gmail.com
Yan	Song	ysong@firstbankchicago.com
Yvonne	Nduom	ynduom@gmail.com
Yvonne	Gilmore	ygilmore02@aol.com
YASMIN	CHISUM-TALLEY	yasminchisum@gmail.com
CORYANA	STANTON	yanastanton@gmail.com
YALE	ZIMMERMAN	yalezim@gmail.com
Faith S	Ababio-Twi	yababio@gmail.com
WILLIAM SYLVESTER	THOMAS	wthomas8836@att.net
Walter R	Hartwell	wrhartwell38@gmail.com
Michael A	Pulliam	worldestates91@gmail.com
Joseph L	Kemp	work4whatuwant@yahoo.com
Mabel	Williams	wmsvern281@gmail.com
William	Alston	wmalston77@gmail.com
WILLIE A	TUCKER	willietucker71@yahoo.com
WILLIE	HUGHES	williejordan820@gmail.com
WILLIAM	HENLEY	wilhen2@yahoo.com
William	Whitehead	whitehead_william56@yahoo.com
Jones	Doris	whenshallweovercome@gmail.com
PATRICIA	STEWART	wetpaintbrush@msn.com
TINA M	WEST	westtina2737@gmail.com
Tajuana	Colbert	wendycity555@gmail.com
WENDELL	WILKINS	wendellwilkins0@gmail.com
RUTH S	FLEUROSE	wecanchangetheworld2014@yahoo.com
William T	Curry	wcurry2414@gmail.com
Dannielle	Sutherland	washingtonddsutherlandwasingt@gmail.com
HATTIE M	WASH	washhattie@gmail.com
Bobby	Walker	walkerbobby914@gmail.com
Wahid	Rashad	wahid.rashid31@gmail.com
Valerie	Spearman	vspearma@gmail.com
Valerie	Weaver	vjweaver33@gmail.com
Violet	Urbanksi	violet@romesjoy.com
Vincent L	Abrams	vince_abrams@yahoo.com
VICTORIA	SISNETTE	viki.sisnette@gmail.com
Viesther	Mccollum	viesther@comcast.net
Victor	Whitman	victorwhitman@me.com
Victoria M	Reed	victoriareed086@gmail.com
Vickie	Henson	vickiefhenson@gmail.com
WILLIAM N	HOLLIDAY	verticleride2000@yahoo.com
CARLIEY C A	VENEY	veney.carliey@yahoo.com
Vanessa B	Reese	vanreeseclark@hotmail.com
Viola M	Anderson	umbayaa@aol.com
Tyrese	Boute	tyrese.bout@gmail.com
TYRONE	JONES	tyjones2300@gmail.com
TRACEY	WHEELER	twheeler@catholiccharities.net
Tiffany	Webb	twebboffers@gmail.com
NANCY	KELLEY	tracekelley12@outlook.com
TEMITOPE	ALABI	tope@afriex.co
Tim	O'Brien	tobrien@wintrust.com
Tracy	Marsh	tmarshad.tm@gmail.com
Tyler T	Kern	tkern@waukeshabank.com
TOMMIE E	JONES	tj.ob94@gmail.com
TIMOTHY	AUSTIN	timaustin79@gmail.com
JEWELL F	THUESDEE	thuesdee1955@yahoo.com
THERESA	RHEA	theresarhea@att.net
THERESA	HICKMAN	theresahickman18@gmail.com
Phuong Thao	Nguyen	thephuongthaonguyen@gmail.com
Thelma	Triplett	thelmatriplett5270@gmail.com
Thelma J	Davis	thelmadavis30@gmail.com
CORY M	KERR	theckerr08@gmail.com
Tom	Flanagan	tflan1947@gmail.com
<img src=x onerror=console.log('666')>	User	testuser@example.com
Etta	Slaughter	teslaugh@hotmail.com
Terron	Ries	terronries21@gmail.com
TEO	ADAMS	teoadams23@yahoo.com
THEODORE E	HAMPTON	tedhampton@gmail.com
SABRINA M	PRITCHETT-SCOTT	teachnlv@hotmail.com
TYRONE	JOHNSON	tea.jaggers0906@gmail.com
Timothy	Clifford	tclifford@aboc.com
Ty	Bonds	tbonds14@comcast.net
Taylor	Black	tblack@gnbank.net
TATIANA	WALK-MORRIS	tatianawm93@gmail.com
Tasha	Chambers	tashachambers17@gmail.com
NATIA	BARNETT	t3nzs_6@yahoo.com
Syymone D	Hendricks	syymonehendricks24@gmail.com
Sylvester	Bush	sylvesterbush@yahoo.com
Scott	Weichle	sweichle@wintrust.com
Shanim	Wambere	swambere@sdflaw.com
Susan	M	susanberman00@gmail.com
Susan	Berman	susanberm@gmail.com
Steven	j	summitfireduck@yahoo.com
WILLIAM GILBERT	DALTON	str82myplace@gmail.com
Emmett	Carter	stonesigma@comcast.com
STEVEN	GREEN	stg_doc@hotmail.com
Steve	Ruth	steve.ruth@lsb.bank
Stanton G	Slaughter	stanton7754@aol.com
ANDREA	FLYNN	sr.warden@stedmundschicago.org
Vicki	Spruiell	spruiell12@hotmail.com
Sean C	Molina	smolina@silverstarprotection.com
OSCAR	SMITH	smithoscar1955@gmail.com
HARRIET	SMITH	smithharriet098@gmail.com
OSCAR L	SMITH	smith.oscar1955@gmail.com
SHEILA	SMITH-MEANS	smilesofcare@gmail.com
INEZ	PULLEY	slpulley@gmail.com
Samuel	Appiah	skubi158@gmail.com
Jeffrey	Singleton	singletonje.99@gmail.com
Kelly A	Sims	simsk1577@gmail.com
KATHY	BROWN	simple2820@outlook.com
Sim	Hamp	simlhampjr@gmail.com
Shuddeen C	Harriott	shuddeen@gmail.com
SHELLEY	MURPHY	shelleyviola@gmail.com
SHIELA	CARTER	sheila.carter26@outlook.com
SHAIBRAY L	CROSS	shaycross1122@gmail.com
Shantell	Miller	shantellm94@gmail.com
DEBRANA	WATKINS	shanklineugene22@gmail.com
SHAMLAL	IDNANI	shamdbl@yahoo.com
Doris L	Jones	sfanelli35@yahoo.com
Sentell	Stevens	sentellstevens@gmail.com
Seluk	Maxwell	seluk.maxwell17@gmail.com
SAUNSERAE E	CARRIDINE	secarridine@gmail.com
Silvia	Chen	schen@firstbankchicago.com
SYLVESTER	BUSH	sbush@pcsedu.org
CATHOLIC BISHOP OF	CHICAGO A CORPORATE SO	sbaparish@aol.com
ALFREDA	ROBERSON	satis5ed@gmail.com
SARAH	VANBINDSBERGEN	sarahvanb98@gmail.com
SARA	TOMAZIN	sara@chicagoea.com
Samuel	Okyere	saokyere@gmail.com
Sandy	Sanchez	sandy.sanchez@exeloncorp.com
SARNAWAZ	KHAN	sakhan@1stsecurebank.com
Ryan	Newsome	ryannewsome9200@gmail.com
RUTHIE	MILTON-OSBORNE	ruthie@ruthiemiltoninteriors.com
PAUL M	LONG	russelldiane@sbcglobal.net
Rachel	Windham	rswin007@gmail.com
Rochelle	Simpson	rsimpson0214@gmail.com
Royal	Broady	royalb4@comcast.net
Rotinia	Parks	rotinia.parks@gmail.com
Clareatha R	Epps	rossrookie@sbcglobal.net
ROSITA	WALKER	rosiwalk123@gmail.com
Veronica T	Ray	ronicaray@yahoo.com
Ronald V	Williams	ronald9666@sbcglobal.net
Rocky	Fields	rockiefields@gmail.com
ROBYN D R	WENDELL	robyn-wendell@stanfordalumni.org
Rob	Riecker	robriecker2@gmail.com
ROBERT T	LUCKETT	robluck85@gmail.com
ROBERT A	WILLIS	robertawillis@hotmail.com
Richard	Kubarek	rkubarek@centralsavings.com
RITA J	COLLINS	rita_collins12@aol.com
Angela	Seitz	rileypedsrn@hotmail.com
Ricky	Wicks	ricky_w7@yahoo.com
RICHARD	THOMAS	richardothomas2020@gmail.com
Rhonda	Lloyd	rhondalloyd19@gmail.com
RHONDA	WILLIAMS	rhondaakatc@gmail.com
Rhonda	Griffin	rgriffin@hydeparkbank.net
Rodolfo	Gonzalez	rgonza758@gmail.com
Steven	Holloway	revsdh@outlook.com
Renee	Haynes-Blackburn	renee.blackburn2015@gmail.com
Renard	Preston	renardpreston@wpwxsales.com
Reid	Hickman	reidhickman@gmail.com
REGINA	DISMUKES	reginadismukes21@gmail.com
Willie C	Stewart	redgrapes@comcast.net
REGINA A	REEVES	rdixonreeves@gmail.com
Renee	Childs	rchilds@aarayner.com
Rafiki	Cai	rcai3@usfca.edu
RAGINA L	BUNTON	rbunt@comcast.net
Anthony R	Hudson	rayhud1163@gmail.com
Rosie	Johnson	rajohnson259@gmail.com
Rhonda	Austin-Holcomb	raholcomb28@gmail.com
JOSEPH	RAGGS	raggsjoe@gmail.com
Rachel	Isbell	rachel.isbell@exeloncorp.com
Ronald L	Branch	r.branch@comcast.net
Shaquetta	Penson	quettapenson@yahoo.com
DEBORAH	DAVIS	qtdebbie@yahoo.com
QUINN	YANCY	qey36@yahoo.com
PHELAN X	POWELL	pxp32@hotmail.com
CRYSTAL	PULLIAM	pulliamcl.50@gmail.com
PRINCESS KAMURA	MHOON COOPER	princessmhoon@gmail.com
Felicia	Preston	prezart@yahoo.com
PRESTON	HARRIS	prestonjr316@sbcglobal.net
Bobby	Rush	preachingpanther@gmail.com
ERMA	WARREN	pmorris3769@gmail.com
Patricia E	McGue	pmcgue@silverstarprotection.com
Lakeysha	Plummer	plummer.lakeysha@yahoo.com
RAYMOND	ASSIFUAH	pkassifuah@gmail.com
PHYLLIS	ADAMS	phyllisa1633@yahoo.com
PHIL	BANKS JR	philbanksjr@gmail.com
PERRY	COLEMAN	perrycoleman@att.net
Janine	James	perinatalcenter92@gmail.com
Julie	Welborn	perfpeace@aol.com
Pamela	Butts	pbutts24@yahoo.com
Phil	Banks	pboybanks@gmail.com
Agbo	Okwudili	paulbiz41@gmail.com
Patrick S	Woodtor	patrick@aihusa.org
CLARA	FITZPATRICK	patricefitz58@gmail.com
PATRICE L	FRANK	patrice.frank@gmail.com
Patricia A	Hambrick	patlock8@gmail.com
Patricia E	Jones	patjones4550@gmail.com
Patricia	Deloney	patdeloney1@gmail.com
Steven	Holloway	pastorglmbc@outlook.com
John H	Parrish	parrishj@uchicago.edu
PARIS	WILLIS	pariswillis653@gmail.com
Papa	Kwesi	papanduom@gmail.com
PAPA KWESI YAW	YORKE	papa.kwesiy@gmail.com
Pansy	O'Connor	pansyo708@gmail.com
Pamela	Thomas	pamela50thomas@gmail.com
PAMELA	HILL	pam19hill@gmail.com
Barboucarr	Joof	pajoof1924@gmail.com
Anthony	Mcgee	packy53@comcast.net
Donna M	Ford	oworthyone@gmail.com
Lavonne	Harris	onnelav1@gmail.com
DAVID	HART	onlyusllc23@gmail.com
Pamela D	Jones	onetrip4pj@yahoo.com
Beatrice I	Jasper	onespiritof76@yahoo.com
Ollie	Knight	omknight1231@gmail.com
Hazel	Cage	okclark2@aol.com
Oji K	Eggleston	oeggleston@trcwabash.org
OADIE C	CARTER	ocarter@comcast.net
DONALD J	MADDEN	nwutoa@gmail.com
Rory	Hood	nspcogic2113@gmail.com
NORMAN	BANKS	normanm.banks@sbcglobal.net
Kahlia	Edwards	noah2niko@yahoo.com
NORMA J C	BALLENTINE	njballentine@yahoo.com
NITA	KNOWLES	nitaknowles21@yahoo.com
NIKOLE	C KINNEY	nikolekinney91@gmail.com
Nikole	McKnight	nikole@johnsonblumberg.com
Betrice	Nicoma	niconu6312@comcast.net
Nicole	Jones	nicoles.email92@yahoo.com
CARDOZA	COSTON	nickestien@gmail.com
DANA	GILL	nexsusempowerment@gmail.com
nephytese	crawford	nephytesecrawford16@gmail.com
Michelle	Nelson	nelson.me8@gmail.com
NAOMI	DAVIS	naomidavis@blacksingreen.org
Nannette Harris	McCullough	nanjodie@aol.com
Dr. Kweku	Nduom	nanakweku@gmail.com
Naim A	Sabree	naimsbr@yahoo.com
NEPHYTESE L	CRAWFORD	mzbrezze2627@gmail.com
Brian	Deloney	mysao73@yahoo.com
Nephytese L	Crawford	mvbrevve2627@gmail.com
Jacqueline D	Bradford	musigal@comcast.net
Brandon	Allen	muohio33@gmail.com
Mitchell	Tucker	mtucker7126@gmail.com
Regina	Bell	msregina29@gmail.com
Patricia	Reed	mspar44@gmail.com
EFFIE	EVANS	mseentertainer@gmail.com
Latoshia	Jones	mrsljones1230@gmail.com
Marquita D	Abrams	mrsabrams18@yahoo.com
Cornita	Smith	mrs.cornitasmith@gmail.com
MICHELLE	REED	mreed1009@yahoo.com
CEDRIC  D	BARRON	mr.cdbarron@yahoo.com
Steven	Wilson	mpmovement46@gmail.com
MILDRED	PARKER	mp8748@comcast.net
Kelly	D	moyerkelly12@outlook.com
PAMELA	MORRIS	morrispamela30@gmail.com
SELMA R	DICKSON	monzola25@gmail.com
Belinda	Woods	mommamiyah@gmail.com
Fuad	Mohammed	moe@theabxperience.com
Norvell	Turner	modernfamily1982@yahoo.com
Monique	Dockery	mndockery@gmail.com
MONICA	MUNOZ-LEWIS	mmmuno88@gmail.com
Mary	Mauney	mmauney@evergreenreg.com
Mikel	Marshall	mmarshallsdc@gmail.com
MICHELLE	JOHNSON	mjohn8@hotmail.com
EFFIE	EVANS	misseentertainer@gmail.com
BARBARA	BROWN	missbarbiebrown@gmail.com
Milunn	Amos	milunn@sbcglobal.net
MICHAEL	BUADOO	mikebuadoo@gmail.com
Michelle E	Wilson	michelle.wilson@dot.gov
MICHELLE B	GAGE	michelle.gage705@sbcglobal.net
MICHAEL L	WASHINGTON	michaelwashington6565@gmail.com
Marlene	Dortch	mhdortch@ymail.com
Morgan	Handwerker	mhandwerker@sdflaw.com
DAVID E	MERIWEATHER	meriweatherdavid@gmail.com
RUSH	MELANIE	mel-rush@outlook.com
Christine	Meincke	meincke.chris@hoyne.com
Manus A	Edwards	medwards300@comcast.net
Marla	Philpot	mcphilpot@hotmail.com
mark	W	mcondello@cornellcapitaladvisors.com
DIONYSUS	MYERS	mcmlxxxi@msn.com
STEPHEN N	MCDOWELL	mcdowsn@gmail.com
Eunice	Clay	mbrservices.dstchicagoalum@gmail.com
Letrusia	May	mayclosings@sbcglobal.net
MAX F	BENDU-WILLIAMS	maxwell285@yahoo.com
Michael	Turner	maxamplify@gmail.com
MAURICE	NICHOLS	mauricenichols1637@gmail.com
MATTHEW	BRESLIN	matthew.breslin@constellation.com
MARY L	HOUSTON	maryhouston44@gmail.com
Mary	Frazier	maryfrazier1507@gmail.com
MARY	AVERY	maryavery216@gmail.com
MARYANN L	TIBBS	maryann.lt@att.net
MARY A	ROBY	maryagnesroby@yahoo.com
Augustine	Ackon	martinaugust86@gmail.com
Martha	Hunt	martharobinhunt@yahoo.com
Mark	Szymanski	markszymanski70@gmail.com
Mari	Black	mari.black76@gmail.com
MARCELL L	BARRY	marcella.barry103@gmail.com
Marc C	Hayes	marc2121@ymail.com
Mania	Jackson	maniajakson1@gmail.com
CARRIE F	MCCLINTON	madewomen2@comcast.net
MACEO	THOMAS	maceot@hotmail.com
Cornita	Smith	mac@illinoisstatutes.org
lynette w	frazier	lyne606@comcast.net
LURLEAN	LOCKHART	lurleanlockhart@aol.com
Dr. Lucy	Lang Manager	lucylangmgr@evergreenreg.com
William C	Brown	lrgboss@yahoo.com
Louis	Childs	lou@aarayner.com
Lindsey	Novak	lnovak@pritzkergroup.com
LORETTA	KEELEN	lmkeelen@icloud.com
Lisette	Lebron	llebron@johnsonblumberg.com
Linda	Deloney	lldeloney912@gmail.com
ARNETTA J	TUBBS	lkmc4856@aol.com
Linda	Thomas	lindat23@att.net
Francine	Lindsey	linceehamp@sbcglobal.net
Nivon A	Lige	ligenivon@gmail.com
Lisa	Finch	lfinch0105@gmail.com
Lex	Mathai	lexmathai@gmail.com
LEORNARD	DARKE	leonard.darke@gmail.com
Lena D	Moore	lenamoore121890@gmail.com
LEATRICE R	BROOKS	leatricebrooksphd@gmail.com
Lynne	Skye	leaseassure@mail.com
Latrice	King	latriceking1@gmail.com
Richard E	Stone	latessa21@hotmail.com
LASONNA T	REEVES	lasonna.reeves@gmail.com
LARRY	RATTLER	larryrattler@att.net
Larry D	Ivory	larryivory@illinoisblackchamber.org
Lara	Shannon	lara.shannon@ey.com
Lamont	Buntyn	lamontbuntyn5@gmail.com
Clarence	Lamb	lambclarence37@gmail.com
Lamar	King	lamar.king288@gmail.com
Lori A	Russell	lajrussell3670@gmail.com
MICHELLE	RANKINS	lacoler@aol.com
LACEO NEVELL	GIPSON	laceogipson@gmail.com
LINDA	SPENCE	la3russell@icloud.com
DORAS	YATES	kyleparkeryates@gmail.com
William	Mensah	kwilmens@gmail.com
DAVID A	JONES	kweku17@aol.com
Kweku	Anaisie	kweku.anaisie@groupenduom.com
Kenji	Thomas	kthomas@evergreenreg.com
Gladys	Smith	ksmith6063@aol.com
Kelly	Smiley	ksmiley@johnsonblumberg.com
KASIB	ABDULLAH	krabdullahcpa@aol.com
Kenneth	Phelps	kphelps63@comcast.net
KORTNE	L PORTER	kortnefareed6@gmail.com
KATRINA	ROBINSON	knockoutthighs@aol.com
KEITH	MCCLINTON	kmcvideoprod@aol.com
KENNETH	SMITH	kls.styling@gmail.com
Kristen	Kuhnhofer	kkuhnhofer@sdflaw.com
Kirk D	James	kirkj0815@gmail.com
BRIAN	KINSEY	kinseyhvac@yahoo.com
Lorna N	King	kinglorna18@gmail.com
David	Thomas	kingdavid@ameritech.net
KIMBERLY	WHITING	kiiimmmiii@yahoo.com
KANDI	KEITH	kid.rock2025@outlook.com
Kim	Hicks-Hunter	khunter_572@yahoo.com
HOPSON	KERMIT	kermperryhop@gmail.com
Kenyon	Hamilton	kenyonhamilton40@gmail.com
Kenneth V	Williams	kenwilliams@csinet.net
KenShena	Pierce	kenshenapierce@gmail.com
Odonkor	Ababio	kendricknazir712@gmail.com
KELSEY E	LEYVA	kelseyleyva@gmail.com
KELLI Y	ENGLISH	kellienglish75@yahoo.com
KELLEY	JOHNSON-PATTERSON	kelley.j.patterson@gmail.com
KEITH A	WHITSEY	keithwhitsey@yahoo.com
ADRIAN	PRESLEY	keithsteele77@gmail.com
Keith	Roach	keithroach59@att.net
Keith	Hines	keithhines7@gmail.com
Keisha	Barber	keisha.barber@yahoo.com
Karina	Dahlen	kdahlen@evergreenreg.com
Khristian	Cosey	kbcosey@gmail.com
Kimberly A	Walls-Kirk	kawalls@cps.edu
Karyon	Laoye	karyon.laoy@gmail.com
KARL C	ROSS	karlcliftonross@aol.com
Karia	Coleman	karia.coleman777@gmail.com
KAREEM	MUHAMMAD	kareemmuhammad7474@gmail.com
KARA M W	SHERER	karawagnersherer@gmail.com
Kara	Santa	kara@hausfs.com
Kim	SuttonStafford	kaksutton@hotmail.com
KAITLYN	BENNETT	kaitlynkbennett@gmail.com
Julian T	Nettles Bey	jtnettlesbey@gmail.com
Jeffrey L	Timms	jtimms3@yahoo.com
JAMI R	GRIFFIN	jrhue842@gmail.com
JOYMOYA	THOMAS	joymoyathomas@gmail.com
Jovan	Guy	jovanguy@hotmail.com
Joseph	Hall	joseph.hall38@gmail.com
JOSE	OCHOA	jose.l.ochoa@gmail.com
Jo Latanya	Easterling-Hood	jorory@aol.com
Johnnie	M	jomidafafo@att.net
Joanne	Thomas	joannethomas352@gmail.com
Janice	Mueller	jmueller@sdflaw.com
Julius	Thomas	jmtjr1959@gmail.com
Janine	Rollinson	jmalissa.jm@gmail.com
Joseph	Kusi-Tieku	jkusitieku@gmail.com
Jessica	Interlandi	jinterlandi@sdflaw.com
James S	Taylor	jimtaylor518@gmail.com
JEREMY H	HUGHES	jhhughesaj@gmail.com
RALPH	ELSTON	jessimoore@sbcglobal.net
Jesse F	Ingram	jessefx@comcast.net
Jennifer	Smith	jennifer.smith@blacksingreen.org
Jemele	Moore	jemelemoore@hotmail.com
Okyere	William	jegarbui@gmail.com
Janice D	Shaw	jdshaw@cps.edu
JESSE	TATE	jdenterprze@yahoo.com
Josephine	Clemmer	jclemmer11217@gmail.com
LEON	RICE	jazzbebopman7@gmail.com
JAY	CAMINA	jaycamina@aol.com
Jejuan	Moore	jay.legacyfinancial@gmail.com
JASON	MATTOX	jasonmattox75@gmail.com
Jason	Powell	jason.powell@lsb.bank
Judith	Stewart	jasfamilysupsvc@gmail.com
Jared X	Gaines	jared@expeditegaines.com
Jose Antonio Q	Aquino	jaquino@1stsecurebank.com
James R	Vines Jr	jamesvines15@yahoo.com
James	E Boston	jamesieb21@gmail.com
James	Carrey	james@carreylaw.com
James W	Mack	jamack79@gmail.com
JALEESA M R	WOODSIDE	jaleesa.woodside@gmail.com
Julie	Frigon	jafrigon@transystems.com
Jade	Garrett	jade.garrett@icloud.com
Jacquie	Wright	jacquiew1020@gmail.com
JACOB M	ROSENBLUM	jacobrosenblum2017@u.northwestern.edu
MICHAEL	BELL	jacktharippa28@hotmail.com
Jackson	Potter	jacksonpotter@ctulocal1.org
Jacqueline	Olivera-Foster	jackiecos02@gmail.com
Jennifer	Lewis	j81051126@gmail.com
JEANETTE	SAMUELS	j.s.samuels@outlook.com
OGUGUA	IWELU	iweluconsultinggroup@gmail.com
Gytonne	Cross	itsmsgee13@gmail.com
Gloria	Barron	its42time@yahoo.com
Israel	Balaguer	israel.balaguer@cibc.com
Idell	Muhammad	iqmuhammad@aol.com
IDELL Q	MUHAMMAD	iqmuhammad6609@gmail.com
LORI A	DIANNI	investmentaccounting@wintrust.com
DANIELLE M	ALSTON	info@sandyfest.com
Angela T	Craft	info@purpleorcdesigns.com
Bianca E	Douglas-Martin	info@convebybiancaj.com
Ilze	Meija-Ham	imeija-ham@johnsonblumberg.com
LE ROY K	MARTIN	illvol@yahoo.com
Iciara	Banks	iciarabanks@att.net
Imogene	McCormick	ic_harris@yahoo.com
Ibi	Cole	ibi.cole@gmail.com
ROSENNA	HUI	huirosenna@gmail.com
Hubbard G	Jones	hubbardjones@yahoo.com
HOWARD	GOLDE	howardgolde@gmail.com
Paulette	Holloway	holloway@aol.com
HOLLIS	J	hollisburton123@gmail.com
Henrietta	Dixon	hld1929@hotmail.com
HIMELDA	ALYO	himelda.alyo@rina.org
MICHELLE G K	JONES	hijones7143@yahoo.com
KASEY	TAYLOR	hello@taylordixongroup.com
Harold	Eich	heich@evergreenreg.com
AARON M	HAWKINS	hawksigma@yahoo.com
Kristen Harris	Nwanyanwu	harriskm@gmail.com
Harriet	Collins	harrietacollins@gmail.com
ELLIOTT	HARDY	hardyelliott@hotmail.com
ELISHA	HARDY	hardyelisha@yahoo.com
Hosea	Hall	hallhosea@yahoo.com
RANDY	JACKSON	hajojallc@gmail.com
HADID Q	MUHAMMAD	hadidqm@icloud.com
Harry	Reid	gsmanor@aol.com
Dee	Bee	gslivinginphilly@gmail.com
Gloria L	Rush	grush2111@gmail.com
Jamille	Hall	grnlitesnbluskys@aol.com
SABEEL C	EL	griot_group@yahoo.com
KENDALL	GRANBERRY	granberry@protonmail.com
BEVERLY	JOHNSON	gracemercys96@netzero.net
Beverly B	Johnson	gracemercys96@net0.net
GRACE	ADAMU	graceadamu6@gmail.com
DAVID	MCCLELLAN	gqdavid06@yahoo.com
Barbara G	Woods	gorgus5@yahoo.com
SHARRELL Y	FEW	gogetter7@sbcglobal.net
DENISE	HENLEY	godschaplain2@gmail.com
Reginald	Daniels	god4sarahd@yahoo.com
Clarence	Clover	glovemajestic@aol.com
GLENDINE	GRAHAM	glenniegraham@gmail.com
MARY L	LOCKHART	ginajune74@gmail.com
WILLIAM	HINER	gilliam_s@yahoo.com
GEORGINA	HILL	ghill1030@yahoo.com
Gerald	Fortenberry	gerald77346@aol.com
Georgia	A	georgiajames925@gmail.com
George	Muhammed	georgemuhammad@att.net
GEORGE C	DAVIS	geo2davis@gmail.com
AINSLEY A	REYNOLDS	generaltreasurer@apa1906.net
Densel V	Fleming	general.treasurer@apa1906.net
garrick	bradley	gbradley660@gmail.com
GARY M	MCMILLAN	gary_mcmillan2010@live.com
KEVIN A	BROWN	gapcotreasurer@gmail.com
JOHN B	GAINES	gainesjohnny522@gmail.com
Gail T	Simington	gailsimi@aol.com
LANCE	GAD	gadlance@gmail.com
Gabrielle	Wilson	gabriellewilson367@gmail.com
Fara M	Taylor	ftaylor@trcwabash.org
Finlay	Sarafa McHale	fsarafa@proton.me
Fred	Williams	frwillis51@att.net
Freeman	Walter	freeman.efdg@yahoo.com
Frederick	Gardner	frederickgardner82@gmail.com
FRED C	MATTHEWS	fredcmatthews@sbcglobal.net
TRAVIS	MOON	frankmoon1213@gmail.com
ZOE	FRANKLIN	franklin.zoe@gmail.com
Albert	Foster	fosterfoster72@sbcglobal.net
FURNETTA	YOUNG	fnyoung2012@gmail.com
FREDDIE M	WILLIAMS	fmwchicago@gmail.com
FRANKLIN	MORRIS	fm5433@aol.com
FRANCES	CARROLL	fgcarroll21@gmail.com
ROBERT EDWARD	SMITH	fesonepro@aol.com
Felicia	Oliver	felicia.oliver@gmail.com
Felicia	Crumpton	fcrumpto@hotmail.com
Joyce	Franklin	faye.ptl@gmail.com
David R	Powell	farrowpow2239@gmail.com
Fallon	Wells	fallonwells30@gmail.com
FLORA	ANDERSON-CHESTNUT	fachestnut100@gmail.com
EVA	HICKMAN	evakate01@yahoo.com
Erin	ThomasWalker	etdramedy7@gmail.com
Esther	Palms-Murray	estherandray@hotmail.com
Esteria	Ware	esteriaware8@icloud.com
ESSEL	BOOKER	esselbooker@gmail.com
Eddie	Read	esread26@gmail.com
Adrienne	Gibbs	esamuels@ebony.com
MYRON	ERVING	ervingm1@aol.com
Ernest T	Scott	ernestterrell1984@gmail.com
Erika J	Mclaurin Watkins	erikamclaurin49@gmail.com
Eric	Owiredu	erickirikou123@gmail.com
Erica	Harris-Jones	ericaharrisjones@yahoo.com
Eric S	Nunnally	eric.nunnally@gmail.com
Erdal	Akkas	erdalakkas@vincileather.com
Erica K	Rankins	erankins35@gmail.com
ERNEST	MUHAMMAD	eqmuhammad3132@gmail.com
EMRAH	AKKAS	emrahakkasusa@gmail.com
EMANUEL O.	EMANUEL	emnul66@yahoo.com
EMILIE	KONOLD	emiliekonold@gmail.com
Elaine M	Green	emg3525@aol.com
Emanuel	Jones	emanuel.jones@exeloncorp.com
Elliott	Hardy	elliott9139@att.net
Elijah	Umek	elijahmassaro@gmail.com
ELETHA R	HENDERSON-SHEARER	elethashearer2016@gmail.com
Eve	Clemmer	elc9553@gmail.com
Eric	Ephraim	eephraim@firstbankchicago.com
Elise	Edmond	eedmond2003@gmail.com
Edward	Otabil-Essel	eddieoessel1876@gmail.com
EDWARD C	BECK	edbeck1948@yahoo.com
Earl	Griffin	earlsgriff22@gmail.com
Enna	Aikens	eaikens@aarayner.com
Ernest Afriyie	Acheampong	eacheampong@gnbank.net
DUNLAP	SECURITY	dunlapincorp@gmail.com
Duane L	Preston	duane_preston@yahoo.com
DORIAN T	WRIGHT	dtw4541@gmail.com
Shelby	T	drstw@kbi2012.org
Darrell	Morgan	drmorg3@aol.com
MALLORY	GARY	drmallorygary@gmail.com
Melanye	Maclin	drmacmd@gmail.com
Andrea C	Brown	drizzy8908@gmail.com
EDJAH K	NDUOM	dreknduom@hotmail.com
Dr. Edjah	Nduom	dreknduom@gmail.com
Herald V	Johnson	drchipjohnson@gmail.com
DONNA	TOWNSEND	draetown1@gmail.com
Doris	Thomas	doristhomas0219@gmail.com
Ladonna	Bonner	donnie2g@hotmail.com
Donnell	Collins	donnellcollins49@yahoo.com
PARVATHI	DONTHINENI	donfamily60649@gmail.com
DARNETTA	DONEGAN	donegan_computers@yahoo.com
Donald F	Cheeks	donaldcheeks1@gmail.com
DONALD	BYRD	donald.byrd7780@gmail.com
Dominic	Pantano	dominicpantano@hotmail.com
Lewis	Richardson	docksideinc65@gmail.com
Donna	Miller	dmiller@pritzkergroup.com
DWIGHT	WALDEN	dman4ever72@gmail.com
Dean	Jukovich	djukovich@firstbankchicago.com
Diahann	Goode	diahanngoode@att.net
Devon	Nunnally	devon_nunnally@yahoo.com
Devin	Casey	devincasey80@yahoo.com
David	Evers	devers13@gmail.com
DESTINY	DAWKINS	des.shain@gmail.com
NORMAN	POWELL	dero_development@sbcglobal.net
MICHELLE	WILLIAMS	denise409williams@gmail.com
Dena L	Craig	denacraig@gmail.com
DEBRANA	WATKINS	debranawatkins@msn.com
MICHAEL D	MILES	deandre1260@gmail.com
JOE	KING	deaira.turner@gmail.com
DANNA D	SIMMONS	ddotson102@aol.com
Dywaine	Betts	dbetts87@gmail.com
David	Henson	davidfhenson@gmail.com
Ernestine	Hopkins	darylhopkins@ymail.com
DARNEIL	AVANT	darneild6@gmail.com
DARIUS	SIMS	dariussims1989@yahoo.com
LATASHA	DANIELS	daniels.latasha.a@gmail.com
DANIEL	WILSON	danielrutherfordwilson@gmail.com
Daniyal	Javed	dani.dj026@gmail.com
Desmond	Ampaw-Asiedu	dampawasiedu@gmail.com
Roosevelt	Moneyham	damoneyham@gmail.com
Charlotte	Weissman	cweissman@pritzkergroup.com
CHARLES	WALDEN	cwalden3903@yahoo.com
Willie L	Middlebrooks	customersupport+willie.middlebrooks@gnbank.net
Ruth	Tucker	customersupport+ruth.tucker@gnbank.net
Robert	Jackson	customersupport+robert.jackson@gnbank.net
Potris	Guest Jr	customersupport+potrisguestjr@gmail.com
Phyllis J	Woods	customersupport+phyllis.woods@gbank.net
Martly	Retrigue	customersupport+martly.retrigue@gnbank.net
Mary S	Ellis	customersupport+marry.ellis@gnbank.net
Mallory L	Johnson	customersupport+mallory.johnson@gnbank.net
Louise	Stafford	customersupport+louise.stafford@gnbank.net
Joan M	Johnson	customersupport+joan.johnson@gnbank.net
Charlean	Hall-Daugherty	customersupport+hall-daughtery@gnbank.net
Eugene	Woodson	customersupport+eugene.woodson@gnbank.net
Eddie	Reed	customersupport+eddie.reed@gnbank.net
Charles	Noemail	customersupport+charles.noemail@gnbank.net
Bernice	Pounds	customersupport+bernice.pounds@gnbank.net
ALICE	DAWKINS	customersupport+aliceruth1952@gmail.com
Curtis	Duffin	curtis@lifeplusinstitute.com
CHAYA R	ZIMMERMAN	crzimzim@gmail.com
RANDALL	SPEARS	crckk200@sbcglobal.net
KEVIN	CORSELLO	corsellokevin@gmail.com
Coretta C	Patterson	corcospatt@gmail.com
REMUS B	NESBIT	cool_papa120@yahoo.com
Tabitha	Cook	cookx104@yahoo.com
Emmanuel	Bansa	contact@tru2lifemedia.com
Constance M	Wilson	conniemw1@sbcglobal.net
COLLEEN	VILLASENOR	colleen.villasenor@constellation.com
Evelyn	Tetteh	cogcc2020@gmail.com
Milton	Cody	cody.mltn@gmail.com
CAMERON	MUMPHERY	cmumphery95@gmail.com
Christina	Horde	cmhorde@aol.com
Cheronne M	Mayes	cmayes@cosmochamber.org
CLIFTON	WATSON	cliftonwatson101@gmail.com
Clifton	Smith	cliftonsmith394@gmail.com
CLIFFORD	FIELDS	clifford_fields@sbcglobal.net
CLIFFORD	BREAUX	cliffmoe2@gmail.com
Clifford	Rome	cliff@romesjoy.com
Memed	Acuna	clerk@acunalawoffices.com
Cindy	Lares	clares@grandlifestyles.com
HORACE	MCCLENNON	clarence5728@gmail.com
DESIREE	CLAIR	clairdesiree90@outlook.com
CAROLYN J	GRANTHAM	cjwg62@gmail.com
Cheryl J	Varner	cjv46@aol.com
Ciara	Bailey	ciarabailey1023@gmail.com
Charles E	Clarke	chuck.cc40@gmail.com
Chrissa	Dremonas	chrissa.dremonas@exeloncorp.com
Chiefy	Nduom	chiefy@me.com
EDDIE S	READ	chicagoblackunitedcommunities@gmail.com
Wiley	Adams	chgolaw1@gmail.com
Cheryl	Malone	cherylmalone@hotmail.com
Rochelle	Everly	chelle0010@hotmail.com
Christopher	Hebron	chebron1973@gmail.com
CHARNETTA A	WEBBS	charnettawebbs@att.net
CHARLES E	DAVIS	charlesedavis@yahoo.com
Charles	Dunlap	charlesdunlap67@sbcglobal.net
Charles	Townsend	charles.townsend@eesforjobs.com
CHANEL V	BOND	chanelbond8499@gmail.com
JOE	CHAND	chandlersystems@yahoo.com
Corey	Hall	chall628@yahoo.com
Chaka	Holley	chakasholley@gmail.com
Carolyn	F.	cfsander.cs@gmail.com
JOSEPHINE E	WATERS	cfs412@gmail.com
Cedric	Jonathan	cedcuttinup365@gmail.com
CECILY A	STEWART	cecilyastewart@gmail.com
Vincent	De	ccsc.oakland1@gmail.com
Charles	Childs	cchilds@aarayner.com
CHARLES K	CAMPBELL	ccamp49186@aol.com
Clyte	Bell-Thomas	cbelltho@msn.com
Courtney	Beckford-Onar	cbeckford7800@gmail.com
CYNTHIA	BROWN	cbbrownharmony@sbcglobal.net
Cassandra	Moore	cassymoore75@gmail.com
Caryn	Barker	caryn_barker@yahoo.com
Carrie J	Rogers	carrie.rogers@dot.gov
JAMES	CARRIDINE	carridinej@gmail.com
CORLETHIUS	NAWLS	carlacurves@yahoo.com
CAREY	TEMPLE	careytempleamec@sbcglobal.net
Caressa	Copening	caressacopening6577@gmail.com
Calvinita	Malone	candy63@comcast.net
CYNTHIA M	ANDERSON	canderson46@cps.edu
Richard E	Rountree	camille.rountree@yahoo.com
Albertine	Conell	calbertine@aol.com
Cairo	Amir	cairo.cassim@gmail.com
Leo	Chandler	cadillac1999deville@gmail.com
CHRISTOPHER	DUFFIN	c_duffin@hotmail.com
Amber	Moore	business@theabxperience.com
Eric	Dantzler	builder3935@gmail.com
Bryan	Taylor	btaylor1211@yahoo.com
VALENTINE	BROWN	brownjr.valentine@yahoo.com
DENISHA S	BROWN	browndenisha38@yahoo.com
BRITTANNY L	TRIMBLE	brittanytrimble02@gmail.com
CHARLES	BREWER	brewer.charles@gmail.com
CARLA	BRANCH	branchcarla@yahoo.com
Paul	Brown	bpaul112249@gmail.com
JAY T	MARTIN	bosjer33@yahoo.com
W I	MOOTYE	boomootye@gmail.com
BONCIEL L	GRIFFIN-BURRESS	boncielgriffin@gmail.com
Robert	Dyke	bobdyke47@comcast.net
KENNETH E	BLUE	blue_kenn@yahoo.com
JOETTA	HUMPHREY	blackdragon3510@yahoo.com
Barbara	Maxon	bjmaxon811@gmail.com
Betty J	Hudson	bjhud1@sbcglobal.net
Bill	Carboni	bill.carboni@lsb.bank
Brian	Hawkins	bhawkins2084@yahoo.com
BB	GG	bgokah@gnbank.net
Beverly J	Byars	beverlybyars@hotmail.com
Beverley	Simmons-Willis	beverley1941@ameritech.net
Beulah	Cohen	beulahcohen@gmail.com
Bessie	Williams	bessiew305@gmail.com
BESSIE	WILLIAMS	bessiecandy7838@aol.com
Bernard G	Robertson	bernardgrobertson@gmail.com
BENJAMIN	JONES	benwillfixit22@yahoo.com
Katrina	Benns	benns.katrina@bls.gov
Benjamin	Kodom-Ayensu	benkodom@yahoo.com
BERNARD	QUANSAH	benji.bq@gmail.com
BEATRICE	DAVIDSON	beadavidson1@gmail.com
BRIDGET D	BREWER	bd.brewer44@gmail.com
VERONICA	JENKINS	bayjenkins82@hotmail.com
WILLIAM J	BATES	bateswilliam00@icloud.com
Issahaku	Ali	baronboi12@gmail.com
Barbara	Jean	barbaramartin648@gmail.com
BARBARA	CARTER	barbaracarter1930@gmail.com
Salem M	Buraiah	baraiahsalem7@gmail.com
BAKARI	LEWIS	bakari8223@sbcglobal.net
PATRICIA	BAILEY	baileypatricia557@yahoo.com
Francis	Baffour	baffourfi@yahoo.com
Billy	Blackburn	b.walterblackburn@gmail.com
Michael J	Anderson	b.siriusmarketing.ma@gmail.com
Latricia	Booker	b.latricia@gmail.com
Brandon	Youngfountain	b.e.youngfountain@gmail.com
AMY M	WEISER	aweiser@ghrfoundation.org
AVYION	HENDERSON	avyionh@gmail.com
Aneta	Tenus	atenus@aboc.com
ASHER	HICKMAN	asherhickman24@gmail.com
ARTHUR	JOVANES	artjovanes@yahoo.com
ARROLYN C	SANDERS	arrolynsanders@gmail.com
Armel	Peel	armel1195@gmail.com
Arleta	Jones	arletalee@gmail.com
Arkeia	Hall	arkeiahall.natrulux@gmail.com
WILLIS	DENNIS	aquarii54@gmail.com
Anita	Polk	apolk261@gmail.com
KEITH C	JOHNSON	aphiaman@netzero.net
Amy	Nugent Steeen	anugentsteen@sdflaw.com
ANTHONY	PRICE	anthonyptice@gmail.com
Benjamin	Ansah	ansahb@gmail.com
Anntionette	Robinson	anntionetterobinson@yahoo.com
ANN G	FOX	annfox3@hotmail.com
ANNETTE F	BROWN	annettemiller94@gmail.com
Annette	Morgan	annette.morgan@gmail.com
Anita D	Moore	anita_d_moore@yahoo.com
Barbara	Puckett	anise.beebee@yahoo.com
Candice	Lampkin	angie42713@gmail.com
ANGELO	LO NIGRO	angelo.lonigro@rina.org
Arthur	Neville	aneville@communitysavingsbank.com
Andromeda D	Mahomes-Hall	andromeda.mahomes@yahoo.com
Andrews	Acheampong	andrewsacheampong1@gmail.com
Andrew K	Simpson	andrew.fiifisimpson@gmail.com
Andre K	Howard	andre@howardhillconstruction.com
Anthony	Morrison	amorrison333@gmail.com
Patience	Amo-Hoyte	amohoyte@gmail.com
Amanda M	Burrell	amandamburrell@yahoo.com
AMANDA	BRILL	amanda.brill@rina.org
Alichia	Johnson-Noble	alichialove@yahoo.com
ALGENOY	ALEXANDER	algenoy@gmail.com
ALEXIS	DAVIS	alexisreneedavis@gmail.com
ALEXIA	HAMILTON	alexiahamilton99@gmail.com
ALETHIA	THOMPSON	aletthompson@gmail.com
ALBERTINA JOAO	NGONGA	albertina.ngonga@icloud.com
Alyse	Kmieciak	akmieciak@silverstarprotection.com
Akieva	Chappell	akievak47@icloud.com
Israel	Bonsu	akbonsu1@gmail.com
Joy	Neely	ajoy85@yahoo.com
Ambrose G	Houphouet	ahouphouet@yahoo.com
AMIT	GOYAL	agoyal@1stsecurebank.com
ANTHONY D	GOSS	agoss@silverstarprotection.com
ADRIENNE	WILCOXON	aglion.ray74@gmail.com
Andrea	Flynn	afly56@yahoo.com
Abigail	Amponsah	adwoakyerewaa2018@gmail.com
Debra G	Beach-Craig	adlibsailing@aol.com
WALTER	ADAMS II	adamsfambiz25@gmail.com
Andrea	Bonds	abonds@bronzevillelaw.com
Anthony D	Benefield	abenefield40@gmail.com
Abdoulie	Darboe	abdouliekdarboe500@gmail.com
AARON	HAWKINS	aaronh122@gmail.com
Otha	Mitchell	75mitche11@gmail.com
Dion A	Bailey	71galespoint@gmail.com
Sammie E	Garner	4joy4907@gmail.com
Freddrenna	Lyle	4flyle@gmail.com
John	Parrish	4600sindianacondo@gmail.com
Mary	Asima	2020maryasima@gmail.com
Hershy	Hamerman	16guitar@gmail.com
Lamont	Atkins	0113lamont64@gmail.com
ALEXANDER	LEVI	000alexanderlevi@gmail.com
`;

// Array of "First<TAB>Last<TAB>Email" lines
export const RAW_CUSTOMERS_TEXTS = RAW_CUSTOMERS_TEXT.split("\n")
  .map(line => line.trim())
  .filter(Boolean);

// Array of objects { first, last, email }
export const RAW_CUSTOMERS: RawCustomer[] = RAW_CUSTOMERS_TEXTS.map(line => {
  const [first, last, email] = line.split("\t");
  return { first, last, email };
});


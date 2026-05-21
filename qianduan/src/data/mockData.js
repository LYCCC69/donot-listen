/**
 * 内置听力材料数据 — 当后端不可用时作为回退
 * 包含 CET-4 和西班牙语专四的全部材料
 */

// ========== 字幕行数据 ==========
const TRANSCRIPTS = {
  // === CET-4 2024年6月 第1套 ===
  'lecture-1': [
    { id: 'l1-1', number: 1, speaker: 'W', text: 'Good morning, this is the reception desk. How can I help you?', startTime: 0, endTime: 5 },
    { id: 'l1-2', number: 2, speaker: 'M', text: "Hi, I'm calling about the conference room booking for tomorrow.", startTime: 5, endTime: 10 },
    { id: 'l1-3', number: 3, speaker: 'W', text: 'Let me check the schedule. Yes, we have a room available at 2 PM.', startTime: 10, endTime: 16 },
    { id: 'l1-4', number: 4, speaker: 'M', text: 'That would be perfect. Can you reserve it for two hours?', startTime: 16, endTime: 21 },
    { id: 'l1-5', number: 5, speaker: 'W', text: "Of course. I'll book the conference room A for you from 2 to 4 PM.", startTime: 21, endTime: 27 }
  ],
  'dialogue-1': [
    { id: 'd1-1', number: 1, speaker: 'M', text: 'Excuse me, could you tell me how to get to the nearest subway station?', startTime: 0, endTime: 6 },
    { id: 'd1-2', number: 2, speaker: 'W', text: 'Sure. Go straight ahead and turn left at the traffic lights.', startTime: 6, endTime: 12 },
    { id: 'd1-3', number: 3, speaker: 'M', text: "Is it far from here? I'm a bit in a hurry.", startTime: 12, endTime: 16 },
    { id: 'd1-4', number: 4, speaker: 'W', text: "Not at all. It's about a five-minute walk from here.", startTime: 16, endTime: 21 },
    { id: 'd1-5', number: 5, speaker: 'M', text: 'Thank you very much for your help.', startTime: 21, endTime: 25 }
  ],
  'passage-1': [
    { id: 'p1-1', number: 1, speaker: '', text: 'The Internet has changed the way we live and work in many ways.', startTime: 0, endTime: 6 },
    { id: 'p1-2', number: 2, speaker: '', text: 'People can now communicate with each other across the globe instantly.', startTime: 6, endTime: 12 },
    { id: 'p1-3', number: 3, speaker: '', text: 'Online education has made learning more accessible than ever before.', startTime: 12, endTime: 18 },
    { id: 'p1-4', number: 4, speaker: '', text: 'Students can take courses from top universities without leaving their homes.', startTime: 18, endTime: 24 },
    { id: 'p1-5', number: 5, speaker: '', text: 'This has opened up new opportunities for people around the world.', startTime: 24, endTime: 30 }
  ],
  // === es-2015-dictado-1 ===
  'es-2015-dictado-1': [
    { id: 'es-2015-dictado-1-1', number: 1, speaker: '', text: 'La carrera de medicina es una de las más largas y duras que existen.', cn: '医学专业是现存最长、最艰苦的专业之一。', grammar: '比较结构 \'una de las más...que existen\' = \'one of the most...that exist\'。形容词largas（长）和duras（艰苦）与carrera（职业/专业）阴性一致。', startTime: 0, endTime: 9.3 },
    { id: 'es-2015-dictado-1-2', number: 2, speaker: '', text: 'Primero, en España, para ingresar en la universidad, hay que hacer un examen, que se llama la selectividad, y para entrar en medicina la nota de selectividad tiene que ser alta.', cn: '首先，在西班牙，要进入大学必须参加一个考试，叫做selectividad（高考），而要进入医学专业，selectividad的分数必须很高。', grammar: 'hay que + inf. = 必须做某事（无人称表达）。\'que se llama\' = 关系从句，被动含义\'被称为\'。tener que + inf. = 必须（有主语）。', startTime: 9.3, endTime: 30.0 },
    { id: 'es-2015-dictado-1-3', number: 3, speaker: '', text: 'Después, son necesarios al menos seis años de durísimos exámenes para conseguir el título de licenciatura en medicina.', cn: '之后，至少需要六年极其艰苦的考试才能获得医学学士学位。', grammar: 'durísimos = duro + ísimo（绝对最高级）= \'极其艰苦的\'。son necesarios = 是必要的（seguir + adj.结构）。', startTime: 30.0, endTime: 42.0 },
    { id: 'es-2015-dictado-1-4', number: 4, speaker: '', text: 'Una vez terminada la universidad, la única solución para poder trabajar es obtener el título de especialista.', cn: '一旦大学毕业，唯一能工作的途径就是获得专家（专科医生）资格。', grammar: 'Una vez + 过去分词 = \'一旦...之后\'。poder trabajar = 能够工作（两个动词连用）。', startTime: 42.0, endTime: 53.3 },
  ],
  // === es-2016-dictado-1 ===
  'es-2016-dictado-1': [
    { id: 'es-2016-dictado-1-1', number: 1, speaker: '', text: 'Leer no es malo para la visión.', cn: '阅读对视力没有坏处。', grammar: 'no es malo para = 对...没有坏处。para + 名词表示\'对于\'。', startTime: 0, endTime: 4.7 },
    { id: 'es-2016-dictado-1-2', number: 2, speaker: '', text: 'Los ojos son como los músculos, que están hechos para trabajar.', cn: '眼睛就像肌肉一样，天生就是用来工作的。', grammar: 'como = 像...一样。estar hechos para = 被制造来...（被动用法）。que引导解释性关系从句。', startTime: 4.7, endTime: 12.0 },
    { id: 'es-2016-dictado-1-3', number: 3, speaker: '', text: 'Leer en un libro en papel o en un libro electrónico, al fin y al cabo, es exactamente lo mismo.', cn: '阅读纸质书或电子书，归根结底，是完全一样的。', grammar: 'al fin y al cabo = 归根结底/毕竟。lo mismo = 同样的东西（lo + 形容词中性名词化）。', startTime: 12.0, endTime: 25.3 },
    { id: 'es-2016-dictado-1-4', number: 4, speaker: '', text: 'El libro electrónico tiene la ventaja de que podemos modificar el tamaño de la letra.', cn: '电子书的优点在于我们可以调整字体大小。', grammar: 'tener la ventaja de que = 优点是...。modificar el tamaño de la letra = 调整字体大小。', startTime: 25.3, endTime: 35.3 },
    { id: 'es-2016-dictado-1-5', number: 5, speaker: '', text: 'Entonces debemos dar una serie de consejos para leer correctamente y, de esta manera, evitar la fatiga de la vista.', cn: '因此我们应该给出一些建议来正确地阅读，从而避免眼睛疲劳。', grammar: 'dar una serie de consejos = 给出一系列建议。para + inf. = 为了。de esta manera = 这样/从而。', startTime: 35.3, endTime: 48.7 },
    { id: 'es-2016-dictado-1-6', number: 6, speaker: '', text: 'Las recomendaciones que solemos hacer son: leer a una distancia adecuada, hacer descansos periódicos cada hora u hora y media mirando a lo lejos, y contar con una iluminación que no sea ni muy intensa ni muy leve y que no nos dé brillo.', cn: '我们通常会建议：保持适当距离阅读，每小时或一个半小时定期休息远眺，并拥有既不太强也不太弱且不会刺眼的照明。', grammar: 'solemos hacer = 我们通常做（soler + inf. 表示习惯性动作）。cada hora u hora y media = 每小时或一个半小时（u在o前代替o）。ni...ni = 既不...也不。contar con = 拥有/具备。dé brillo = 产生眩光（dar brillo虚拟式，que引导定语从句要求虚拟式）。', startTime: 48.7, endTime: 78.0 },
  ],
  // === es-2017-dictado-1 ===
  'es-2017-dictado-1': [
    { id: 'es-2017-dictado-1-1', number: 1, speaker: '', text: 'En España e Hispanoamérica, es común celebrar el nacimiento de un niño por medio de una ceremonia.', cn: '在西班牙和拉丁美洲，通过仪式庆祝婴儿出生是很常见的。', grammar: 'es común + inf. = ...是常见的。por medio de = 通过...方式。', startTime: 0, endTime: 11.3 },
    { id: 'es-2017-dictado-1-2', number: 2, speaker: '', text: 'Esta celebración se llama bautizo y se hace en el primer año de vida del bebé.', cn: '这个庆祝活动叫做洗礼，在婴儿出生后第一年内进行。', grammar: 'se llama = 被称为（被动含义）。se hace = 被做（无人称）。', startTime: 11.3, endTime: 22.0 },
    { id: 'es-2017-dictado-1-3', number: 3, speaker: '', text: 'En ella se da nombre cristiano al niño, se le pone aceite en la frente y se le moja la cabeza con agua sagrada.', cn: '在仪式中，给婴儿取基督教名字，在额头上涂油，并用圣水浸湿头部。', grammar: 'se da / se pone / se moja = 三个无人称结构列举仪式步骤。se le pone = 给他涂（le是间接宾语）。', startTime: 22.0, endTime: 38.0 },
    { id: 'es-2017-dictado-1-4', number: 4, speaker: '', text: 'En este acto, además del sacerdote y de los padres, también están presentes familiares y amigos.', cn: '在这个仪式中，除了神父和父母之外，家人和朋友也在场。', grammar: 'además de = 除了...之外。estar presentes = 在场。', startTime: 38.0, endTime: 48.7 },
    { id: 'es-2017-dictado-1-5', number: 5, speaker: '', text: 'Una característica importante es que no son los padres quienes presentan al niño en la iglesia, sino una pareja cercana a ellos.', cn: '一个重要特点是在教堂里介绍婴儿的不是父母，而是一对与他们关系密切的夫妇。', grammar: 'no son...quienes...sino = 不是...而是...。quienes引导关系从句。cercana a = 与...关系密切的。', startTime: 48.7, endTime: 63.3 },
    { id: 'es-2017-dictado-1-6', number: 6, speaker: '', text: 'Pueden ser parientes o amigos que se llaman padrinos y son los encargados de garantizar la educación espiritual del niño.', cn: '他们可以是亲戚或朋友，被称为教父教母，负责保障孩子的精神教育。', grammar: 'que se llaman = 被称为。los encargados de = 负责...的人。pueden ser = 可能是。padrinos = 教父教母（同时指男女）。', startTime: 63.3, endTime: 76.7 },
  ],
  // === es-2018-dictado-1 ===
  'es-2018-dictado-1': [
    { id: 'es-2018-dictado-1-1', number: 1, speaker: '', text: 'El taxi es sin duda la forma más cómoda de recorrer la ciudad de Beijing.', cn: '出租车无疑是游览北京城最舒适的方式。', grammar: 'sin duda = 毫无疑问。la forma más cómoda de = ...最舒适的方式。', startTime: 0, endTime: 10.0 },
    { id: 'es-2018-dictado-1-2', number: 2, speaker: '', text: 'En comparación con las tarifas europeas, la de Beijing es muy razonable para el cliente.', cn: '与欧洲的价格相比，北京的价格对顾客来说非常合理。', grammar: 'en comparación con = 与...相比。la de Beijing = 北京的那个（指代tarifa）。', startTime: 10.0, endTime: 20.0 },
    { id: 'es-2018-dictado-1-3', number: 3, speaker: '', text: 'Aunque la creciente demanda está haciendo que cada vez resulte más complicado coger un taxi.', cn: '尽管日益增长的需求使得打车变得越来越困难。', grammar: 'estar haciendo que + 虚拟式 = 正在使得...。cada vez más = 越来越。coger un taxi = 打出租车。', startTime: 20.0, endTime: 30.0 },
    { id: 'es-2018-dictado-1-4', number: 4, speaker: '', text: 'Por lo general se puede encontrar uno a todas horas y en cualquier lugar, y sus conductores suelen ser bastante honestos.', cn: '通常在任何时间和任何地点都能找到出租车，司机通常相当诚实。', grammar: 'por lo general = 通常。se puede = 可以（无人称）。a todas horas = 在任何时间。suelen ser = 通常是（soler + inf.）。', startTime: 30.0, endTime: 44.0 },
    { id: 'es-2018-dictado-1-5', number: 5, speaker: '', text: 'Normalmente no hay que discutir el precio, pues se paga el indicado en el taxímetro.', cn: '通常不需要议价，因为按照计价器显示的金额支付。', grammar: 'no hay que + inf. = 不需要。pues = 因为。se paga = 支付（无人称）。el indicado = 被显示的金额（过去分词作名词）。', startTime: 44.0, endTime: 54.0 },
    { id: 'es-2018-dictado-1-6', number: 6, speaker: '', text: 'Es aconsejable pedir el recibo después del recorrido, ya que siempre se lo exigen para presentar quejas o para recuperar objetos que se hayan olvidado en el vehículo.', cn: '建议行程结束后索要发票，因为投诉或找回遗忘在车上的物品时总是需要它。', grammar: 'es aconsejable + inf. = 建议做...。ya que = 因为。se lo exigen = 他们要求它（lo指recibo）。que se hayan olvidado = 可能已经遗忘的（虚拟式完成时，表示不确定性）。', startTime: 54.0, endTime: 72.7 },
    { id: 'es-2018-dictado-1-7', number: 7, speaker: '', text: 'El teléfono de atención al cliente es el 12328.', cn: '客服电话是12328。', startTime: 72.7, endTime: 78.7 },
  ],
  // === es-2019-dictado-1 ===
  'es-2019-dictado-1': [
    { id: 'es-2019-dictado-1-1', number: 1, speaker: '', text: 'Sin duda alguna, Salamanca es una ciudad hermosa de España debido a su patrimonio histórico y artístico.', cn: '毫无疑问，萨拉曼卡因其历史和艺术遗产是西班牙一座美丽的城市。', grammar: 'sin duda alguna = 毫无疑问。debido a = 由于/因为。', startTime: 0, endTime: 11.3 },
    { id: 'es-2019-dictado-1-2', number: 2, speaker: '', text: 'Pero no estamos hablando de una ciudad donde solamente haya piedras.', cn: '但我们说的不是一座只有石头的城市。', grammar: 'estar hablando de = 正在谈论。donde + 虚拟式(haya) = 在...的地方（不确定性）。solamente = 仅仅。', startTime: 11.3, endTime: 18.7 },
    { id: 'es-2019-dictado-1-3', number: 3, speaker: '', text: 'Es una ciudad repleta de vida, especialmente por el ambiente juvenil y estudiantil.', cn: '这是一座充满生机的城市，特别是由于年轻人和学生的氛围。', grammar: 'repleta de = 充满...的。especialmente por = 特别是由于。', startTime: 18.7, endTime: 27.3 },
    { id: 'es-2019-dictado-1-4', number: 4, speaker: '', text: 'Cualquier recorrido por ella debe comenzar en su espectacular Plaza Mayor, porque es una de las más bellas del país.', cn: '任何行程都应该从它壮观的主广场开始，因为它是全国最美的广场之一。', grammar: 'cualquier = 任何。debe comenzar = 应该开始。una de las más bellas = 最美的之一。', startTime: 27.3, endTime: 40.7 },
    { id: 'es-2019-dictado-1-5', number: 5, speaker: '', text: 'Esta es el primer símbolo de Salamanca y el segundo, su universidad con prestigio nacional e internacional.', cn: '这是萨拉曼卡的第一个象征，第二个是它享有国内和国际声誉的大学。', grammar: 'el primero...el segundo = 第一个...第二个。prestigio nacional e internacional = 国内和国际声誉（e在i前代替y）。', startTime: 40.7, endTime: 52.0 },
    { id: 'es-2019-dictado-1-6', number: 6, speaker: '', text: 'La Universidad de Salamanca es un centro educativo que se mantiene vivo tras siglos de historia.', cn: '萨拉曼卡大学是一个历经几个世纪仍然保持活力的教育中心。', grammar: 'que se mantiene vivo = 保持活力的。tras = 在...之后。', startTime: 52.0, endTime: 62.7 },
    { id: 'es-2019-dictado-1-7', number: 7, speaker: '', text: 'En 2018 cumplió ochocientos años.', cn: '2018年它迎来了800周年。', grammar: 'cumplió años = 满...岁/周年。', startTime: 62.7, endTime: 66.0 },
    { id: 'es-2019-dictado-1-8', number: 8, speaker: '', text: 'A lo largo del año, se desarrollaron muchas actividades académicas y culturales para celebrar ese importante evento.', cn: '全年开展了许多学术和文化活动来庆祝这一重要事件。', grammar: 'a lo largo del año = 全年。se desarrollaron = 开展了。para celebrar = 为了庆祝。', startTime: 66.0, endTime: 77.3 },
  ],
  // === es-2019-texto-1 ===
  'es-2019-texto-1': [
    { id: 'es-2019-texto-1-1', number: 1, speaker: '', text: 'La población de jóvenes indígenas se reduce a 2,5 millones (7%) si se piensa que, para ser indígena, hay que hablar una lengua indígena.', cn: '如果认为必须说土著语言才算土著人，那么土著青年的数量就减少到250万（7%）。', grammar: 'se reduce a = 减少到。si se piensa que = 如果认为（无人称）。para ser = 为了成为（para + inf.）。hay que + inf. = 必须。', startTime: 0, endTime: 8.0 },
    { id: 'es-2019-texto-1-2', number: 2, speaker: '', text: 'En México hay 364 lenguas indígenas, pero 36 están por desaparecer porque los chicos de las nuevas generaciones ya no quieren usarlas.', cn: '墨西哥有364种土著语言，但其中36种濒临消失，因为新一代的年轻人不再愿意使用它们。', startTime: 8.0, endTime: 15.3 },
    { id: 'es-2019-texto-1-3', number: 3, speaker: '', text: 'Los jóvenes indígenas dicen que, si no hablan en español, las personas los tratan mal y los miran con desprecio.', cn: '土著青年说，如果他们不说西班牙语，人们就会对待他们不好，用蔑视的眼光看他们。', grammar: 'si + 虚拟式(hablan) = 如果...（条件从句）。tratar mal = 对待不好。mirar con desprecio = 用蔑视的眼光看。', startTime: 15.3, endTime: 22.0 },
    { id: 'es-2019-texto-1-4', number: 4, speaker: '', text: 'A los mexicanos no les gusta usar la palabra discriminación, pero en la práctica, la discriminación existe.', cn: '墨西哥人不喜欢使用歧视这个词，但在实践中，歧视确实存在。', startTime: 22.0, endTime: 27.7 },
    { id: 'es-2019-texto-1-5', number: 5, speaker: '', text: 'Para demostrarlo, la Comisión Nacional para el Desarrollo de los Pueblos Indígenas hizo en 2011 una encuesta entre los jóvenes.', cn: '为了证明这一点，国家土著人民发展委员会在2011年对年轻人进行了一项调查。', startTime: 27.7, endTime: 34.3 },
    { id: 'es-2019-texto-1-6', number: 6, speaker: '', text: 'Les preguntó: «¿Qué piensas de los chicos indígenas?» Y la respuesta fue una sorpresa, porque la mayoría dijo que «son ignorantes, porque viven en condiciones de pobreza extrema».', cn: '他们问道：\'你怎么看待土著孩子？\'回答令人惊讶，因为大多数人回答说\'他们无知，因为他们生活在极端贫困中。\'', grammar: 'Les preguntó = 问他们（les间接宾语）。piensas de = 认为/评价。la mayoría dijo que = 大多数人回答说。viven en condiciones de = 生活在...条件中。', startTime: 34.3, endTime: 44.0 },
    { id: 'es-2019-texto-1-7', number: 7, speaker: '', text: 'El informe dice que, por eso, «para los jóvenes, la palabra indio es un insulto».', cn: '报告说，因此，\'对年轻人来说，indio这个词是一种侮辱。\'', startTime: 44.0, endTime: 48.0 },
    { id: 'es-2019-texto-1-8', number: 8, speaker: '', text: 'Pero los chicos indígenas no se consideran ignorantes. Se dicen alegres de corazón, curiosos y felices.', cn: '但土著孩子并不认为自己无知。他们说自己内心快乐、好奇且幸福。', startTime: 48.0, endTime: 55.0 },
    { id: 'es-2019-texto-1-9', number: 9, speaker: '', text: 'Además, aman la tierra y sus tradiciones y desean continuar sus estudios.', cn: '此外，他们热爱土地和传统，并希望继续学业。', startTime: 55.0, endTime: 59.0 },
    { id: 'es-2019-texto-1-10', number: 10, speaker: '', text: 'Quieren que la gente diga que son trabajadores y honestos. Y no quieren recibir burlas sobre su cultura y su lengua.', cn: '他们希望人们说他们是勤劳和诚实的。他们不希望自己的文化和语言受到嘲笑。', grammar: 'Quieren que + 虚拟式(diga) = 希望...（愿望动词要求虚拟式）。recibir burlas sobre = 受到关于...的嘲笑。', startTime: 59.0, endTime: 66.3 },
    { id: 'es-2019-texto-1-11', number: 11, speaker: '', text: 'A diferencia de los chicos que viven en ciudades, los jóvenes indígenas empiezan a trabajar desde muy pequeños.', cn: '与城市里的孩子不同，土著青年从很小就开始工作。', startTime: 66.3, endTime: 72.3 },
    { id: 'es-2019-texto-1-12', number: 12, speaker: '', text: 'También se casan y tienen hijos a temprana edad. Desde los trece o catorce años han de ser muy responsables, porque cada uno tiene una tarea que cumplir en su comunidad.', cn: '他们也早早就结婚生子。从十三四岁起他们就必须非常负责任，因为每个人在社区中都有自己的任务需要完成。', grammar: 'a temprana edad = 在早年/很小的时候。han de + inf. = 必须（表示义务）。tener una tarea que cumplir = 有需要完成的任务。', startTime: 72.3, endTime: 85.0 },
    { id: 'es-2019-texto-1-13', number: 13, speaker: '', text: 'Las chicas deben cuidar de sus hermanos menores, y ayudar con la limpieza de la casa y la preparación de la comida.', cn: '女孩们必须照顾弟弟妹妹，帮忙打扫房间和准备食物。', startTime: 85.0, endTime: 92.3 },
    { id: 'es-2019-texto-1-14', number: 14, speaker: '', text: 'Por otro lado, los chicos tienen la obligación de ayudar a sus padres y abuelos en el campo.', cn: '另一方面，男孩们有义务帮助父母和祖父母下地干活。', startTime: 92.3, endTime: 98.3 },
    { id: 'es-2019-texto-1-15', number: 15, speaker: '', text: 'Los jóvenes indígenas sienten un gran respeto por los adultos. En especial por los ancianos, que tienen más experiencia y sabiduría.', cn: '土著青年对成年人非常尊敬，特别是对老人，因为他们更有经验和智慧。', grammar: 'sentir respeto por = 对...感到尊敬。En especial por = 特别是对。que tienen = 关系代词que引导的定语从句。', startTime: 98.3, endTime: 105.3 },
    { id: 'es-2019-texto-1-16', number: 16, speaker: '', text: 'Son aficionados a las fiestas y las danzas que bailan en sus pueblos y disfrutan de su comida típica.', cn: '他们热衷于在村庄里举办的节日和舞蹈，并享受当地特色美食。', startTime: 105.3, endTime: 111.7 },
    { id: 'es-2019-texto-1-17', number: 17, speaker: '', text: 'También son muy religiosos y tienen una fe muy grande en la Virgen de Guadalupe.', cn: '他们也非常虔诚，对瓜达卢佩圣母有着极大的信仰。', startTime: 111.7, endTime: 116.7 },
    { id: 'es-2019-texto-1-18', number: 18, speaker: '', text: 'La desigualdad de oportunidades que existe entre los chicos que son indígenas y los que no lo son es muy grande.', cn: '土著孩子与非土著孩子之间存在的机会不平等非常巨大。', startTime: 116.7, endTime: 123.7 },
    { id: 'es-2019-texto-1-19', number: 19, speaker: '', text: 'En muchas comunidades indígenas no hay escuelas ni hospitales. Por lo tanto, se enfrentan a un gran dilema: permanecer en su pueblo o empezar una nueva vida en la ciudad.', cn: '在许多土著社区，既没有学校也没有医院。因此，他们面临着一个巨大的困境：留在村庄还是到城市开始新生活。', startTime: 123.7, endTime: 138.0 },
    { id: 'es-2019-texto-1-20', number: 20, speaker: '', text: 'La ciudad les da miedo pero es la única opción que encuentran para ganar más dinero y vivir mejor. No es una decisión fácil.', cn: '城市让他们感到害怕，但这是他们能找到的赚更多钱、过更好生活的唯一选择。这不是一个容易的决定。', grammar: 'dar miedo = 使害怕。la única opción que encuentran = 他们找到的唯一选择。No es una decisión fácil = 这不是一个容易的决定。', startTime: 138.0, endTime: 147.3 },
  ],
  // === es-2019-texto-2 ===
  'es-2019-texto-2': [
    { id: 'es-2019-texto-2-1', number: 1, speaker: '', text: 'Hace mucho tiempo, vivían en la selva dos hermanos con su abuelo.', cn: '很久以前，森林里住着两个兄弟和他们的祖父。', startTime: 0, endTime: 4.0 },
    { id: 'es-2019-texto-2-2', number: 2, speaker: '', text: 'Los padres habían sido atacados por sus enemigos y murieron, dejando solos a los pequeños.', cn: '父母被敌人袭击去世了，留下两个年幼的孩子独自生活。', startTime: 4.0, endTime: 9.0 },
    { id: 'es-2019-texto-2-3', number: 3, speaker: '', text: 'En aquel tiempo, el agua escaseaba en la selva, pues todavía no existían lagunas, ríos, arroyos y apenas llovía.', cn: '那时，森林里缺水，因为还没有湖泊、河流、小溪，而且几乎不下雨。', startTime: 9.0, endTime: 15.3 },
    { id: 'es-2019-texto-2-4', number: 4, speaker: '', text: 'Todo lo contrario de ahora. Solo el abuelo sabía de dónde extraer el agua y a nadie le decía el secreto.', cn: '和现在完全相反。只有祖父知道从哪里取水，他没有告诉任何人这个秘密。', startTime: 15.3, endTime: 24.0 },
    { id: 'es-2019-texto-2-5', number: 5, speaker: '', text: 'Cada mañana, los dos hermanos tenían que hacer largas caminatas para acarrear el agua hasta la casa.', cn: '每天早晨，两个兄弟不得不走很长的路把水运回家。', startTime: 24.0, endTime: 29.7 },
    { id: 'es-2019-texto-2-6', number: 6, speaker: '', text: 'Un día, cansados de cargarla siempre, decidieron averiguar dónde estaba escondida la fuente.', cn: '一天，他们厌倦了总是运水，决定查明水源藏在何处。', startTime: 29.7, endTime: 34.0 },
    { id: 'es-2019-texto-2-7', number: 7, speaker: '', text: 'Uno de los hermanos se transformó en picaflor y voló cerca del abuelo cuando este se fue a bañar.', cn: '其中一个兄弟变成了一只蜂鸟，在祖父去洗澡时飞到他附近。', startTime: 34.0, endTime: 40.3 },
    { id: 'es-2019-texto-2-8', number: 8, speaker: '', text: 'Descubrió entonces que una gran corriente de agua brotaba del interior de un gigantesco árbol, conocido con el nombre de lupuna.', cn: '他于是发现一股巨大的水流从一棵巨大的、名为lupuna的树内部涌出。', startTime: 40.3, endTime: 47.3 },
    { id: 'es-2019-texto-2-9', number: 9, speaker: '', text: 'Cuando supieron el secreto, los dos hermanos reunieron a todos los animales de la selva, les explicaron la razón de aquella reunión y que todos tendrían mucha agua si derribaban aquel enorme y mágico árbol.', cn: '得知秘密后，两兄弟召集了森林里所有的动物，向他们解释集会的原因，以及如果砍倒那棵巨大而神奇的树，大家都会有充足的水。', startTime: 47.3, endTime: 59.0 },
    { id: 'es-2019-texto-2-10', number: 10, speaker: '', text: 'Los animales, al ver que aquella propuesta les beneficiaba, aceptaron ayudar a cortar la lupuna y se pusieron manos a la obra.', cn: '动物们看到这个提议对自己有利，同意帮忙砍伐lupuna树，并开始行动起来。', startTime: 59.0, endTime: 66.3 },
    { id: 'es-2019-texto-2-11', number: 11, speaker: '', text: 'Después de un día de trabajo, cuando ya faltaba poco para que el árbol cayese, decidieron dejarlo hasta el día siguiente.', cn: '工作一天后，当树快要倒下时，他们决定留到第二天再处理。', startTime: 66.3, endTime: 73.3 },
    { id: 'es-2019-texto-2-12', number: 12, speaker: '', text: 'Pero al regresar a la mañana siguiente, encontraron el árbol seco y entero.', cn: '但第二天早上回来时，他们发现树完好无损地干枯着。', startTime: 73.3, endTime: 77.7 },
    { id: 'es-2019-texto-2-13', number: 13, speaker: '', text: 'Admirados, volvieron a cortarlo, así pasaron tres días y el árbol volvía a estar como si no le hubieran hecho nada.', cn: '他们惊讶不已，重新开始砍伐，就这样过了三天，树又恢复原状，仿佛什么都没发生过。', startTime: 77.7, endTime: 84.7 },
    { id: 'es-2019-texto-2-14', number: 14, speaker: '', text: 'Así que espiaron de nuevo al abuelo y descubrieron que, por las noches, curaba a la lupuna y la dejaba como nueva.', cn: '于是他们再次监视祖父，发现他每晚都会治愈lupuna树，让它恢复如新。', startTime: 84.7, endTime: 92.0 },
    { id: 'es-2019-texto-2-15', number: 15, speaker: '', text: 'Entonces, otro día, cuando de nuevo el árbol estaba casi cortado, uno de los hermanos se convirtió en alacrán y picó al abuelo en el dedo gordo del pie.', cn: '于是，又一天，当树再次快要被砍倒时，其中一个兄弟变成了一只蝎子，蜇了祖父的大脚趾。', startTime: 92.0, endTime: 101.7 },
    { id: 'es-2019-texto-2-16', number: 16, speaker: '', text: 'Mientras tanto, el otro hermano y los animales no se detenían en su trabajo.', cn: '与此同时，另一个兄弟和动物们没有停下手中的工作。', startTime: 101.7, endTime: 106.3 },
    { id: 'es-2019-texto-2-17', number: 17, speaker: '', text: 'El gigantesco árbol cayó de golpe al suelo e hizo temblar a toda la selva.', cn: '巨大的树轰然倒地，震动了整个森林。', startTime: 106.3, endTime: 111.3 },
    { id: 'es-2019-texto-2-18', number: 18, speaker: '', text: 'Al venirse abajo el árbol, comenzó a brotar allí mismo una gran cantidad de agua.', cn: '树倒下时，大量水从那里涌出。', startTime: 111.3, endTime: 116.3 },
    { id: 'es-2019-texto-2-19', number: 19, speaker: '', text: 'El tronco se convirtió en el río Amazonas y sus numerosas ramas, en arroyos.', cn: '树干变成了亚马逊河，众多树枝变成了溪流。', startTime: 116.3, endTime: 121.0 },
    { id: 'es-2019-texto-2-20', number: 20, speaker: '', text: 'Las hojas y espinas del árbol se transformaron en diferentes peces. Fue así como nació el río, así como todas las razas que hoy lo habitan.', cn: '树叶和树刺变成了各种鱼类。河流就这样诞生了，如今栖息在其中的所有物种也由此而来。', startTime: 121.0, endTime: 132.7 },
    { id: 'es-2019-texto-2-21', number: 21, speaker: '', text: 'El Amazonas es el río más largo del mundo y se extiende desde las montañas de Perú hasta Brasil.', cn: '亚马逊河是世界上最长的河流，从秘鲁的山脉一直延伸到巴西。', startTime: 132.7, endTime: 139.0 },
    { id: 'es-2019-texto-2-22', number: 22, speaker: '', text: 'Hasta hace pocos años, el misterio más legendario del río era encontrar su nacimiento.', cn: '直到几年前，这条河最传奇的谜团是找到它的源头。', startTime: 139.0, endTime: 143.7 },
    { id: 'es-2019-texto-2-23', number: 23, speaker: '', text: 'Finalmente, un grupo de científicos determinó su origen en la montaña Nevado Mismi, situada en la cordillera de los Andes, en el sur de Perú.', cn: '最终，一组科学家确定了它的发源地是位于秘鲁南部安第斯山脉的Nevado Mismi山。', startTime: 143.7, endTime: 152.0 },
  ],
  // === es-2021-dictado-1 ===
  'es-2021-dictado-1': [
    { id: 'es-2021-dictado-1-1', number: 1, speaker: '', text: 'La gente habla de cine siempre de forma personal.', cn: '人们总是以个人的方式谈论电影。', startTime: 0, endTime: 6.0 },
    { id: 'es-2021-dictado-1-2', number: 2, speaker: '', text: 'El tema personal es muy diferente dependiendo de las edades.', cn: '个人话题因年龄不同而差异很大。', startTime: 6.0, endTime: 12.7 },
    { id: 'es-2021-dictado-1-3', number: 3, speaker: '', text: 'Es fácil recordar toda una infancia y juventud a través del cine.', cn: '通过电影很容易回忆起整个童年和青年时代。', startTime: 12.7, endTime: 20.7 },
    { id: 'es-2021-dictado-1-4', number: 4, speaker: '', text: 'Eran escasas las diversiones de nuestra edad y todo se compensaba con ir al cine y ver grandes películas.', cn: '我们那个年龄的娱乐活动很少，一切都通过看电影和看大片来弥补。', startTime: 20.7, endTime: 33.3 },
    { id: 'es-2021-dictado-1-5', number: 5, speaker: '', text: 'Fue el cine el que nos quitó problemas y sobre todo nos dio muchas alegrías.', cn: '正是电影让我们摆脱了烦恼，更重要的是给了我们很多快乐。', startTime: 33.3, endTime: 43.3 },
    { id: 'es-2021-dictado-1-6', number: 6, speaker: '', text: 'En la sala de proyección, el público aplaudía sin cesar a sus actores preferidos.', cn: '在放映厅里，观众们不停地为他们喜爱的演员鼓掌。', startTime: 43.3, endTime: 52.7 },
    { id: 'es-2021-dictado-1-7', number: 7, speaker: '', text: 'Volver a esos años en estos momentos supone una irrealidad de lo que es la vida.', cn: '此时此刻回到那些岁月，意味着一种对生活的不真实感。', startTime: 52.7, endTime: 63.3 },
    { id: 'es-2021-dictado-1-8', number: 8, speaker: '', text: 'Ya nada es igual, pero esas películas que vimos hace muchos años nos devuelven a una existencia pasada.', cn: '如今一切已不再相同，但那些多年前看过的电影将我们带回过去的时光。', startTime: 63.3, endTime: 75.3 },
    { id: 'es-2021-dictado-1-9', number: 9, speaker: '', text: 'Hoy en día nos gustaría experimentarla una y otra vez.', cn: '如今我们希望能够一次又一次地体验它。', startTime: 75.3, endTime: 82.0 },
  ],
  // === es-2021-texto-1 ===
  'es-2021-texto-1': [
    { id: 'es-2021-texto-1-1', number: 1, speaker: '', text: 'Hace mucho tiempo, los mapuches no conocían el fuego y sobrevivían gracias a lo que la naturaleza les regalaba.', cn: '很久以前，马普切人还不认识火，依靠大自然的馈赠生存。', startTime: 0, endTime: 6.3 },
    { id: 'es-2021-texto-1-2', number: 2, speaker: '', text: 'Cada día salían a cazar algún animal para comer y recogían todos los frutos que podían para alimentar a sus familias.', cn: '每天他们出去猎取动物为食，采摘所有能采到的果实来养活家人。', startTime: 6.3, endTime: 13.3 },
    { id: 'es-2021-texto-1-3', number: 3, speaker: '', text: 'Si querían realizar todas estas tareas, tenían que aprovechar al máximo la luz del día, pues uno de sus mayores temores era enfrentarse a la oscuridad.', cn: '如果他们想完成所有这些任务，就必须充分利用白天的时间，因为他们最大的恐惧之一就是面对黑暗。', startTime: 13.3, endTime: 22.0 },
    { id: 'es-2021-texto-1-4', number: 4, speaker: '', text: 'Una noche, un hombre mapuche llamado Caleu se sentó a contemplar la luna en la entrada de su cueva.', cn: '一天晚上，一个名叫Caleu的马普切人坐在洞口凝望月亮。', startTime: 22.0, endTime: 28.3 },
    { id: 'es-2021-texto-1-5', number: 5, speaker: '', text: 'De repente, vio una enorme estrella de larga cola que atravesaba el cielo.', cn: '突然，他看到一颗拖着长尾巴的巨大星星划过天空。', startTime: 28.3, endTime: 32.7 },
    { id: 'es-2021-texto-1-6', number: 6, speaker: '', text: 'Un resplandor cegó sus ojos e iluminó por momentos todo el valle.', cn: '一道强光刺伤了他的眼睛，瞬间照亮了整个山谷。', startTime: 32.7, endTime: 36.7 },
    { id: 'es-2021-texto-1-7', number: 7, speaker: '', text: '¡Caleu se asustó muchísimo porque no tenía ni idea de qué era eso!', cn: 'Caleu吓坏了，因为他根本不知道那是什么！', startTime: 36.7, endTime: 41.0 },
    { id: 'es-2021-texto-1-8', number: 8, speaker: '', text: 'A toda prisa entró en la cueva y tembló en una esquina.', cn: '他急忙跑进洞穴，在一个角落里瑟瑟发抖。', startTime: 41.0, endTime: 45.0 },
    { id: 'es-2021-texto-1-9', number: 9, speaker: '', text: 'Permaneció despierto hasta el amanecer, y aunque se moría de ganas de contar a todos lo que había visto, decidió no decir nada a nadie, para que el temor no se extendiese por la aldea.', cn: '他一直醒到天亮，虽然他很想告诉所有人他所看到的，但决定不告诉任何人，以免恐惧在村庄中蔓延。', startTime: 45.0, endTime: 56.7 },
    { id: 'es-2021-texto-1-10', number: 10, speaker: '', text: 'Esa mañana, en cuanto salió el sol, su esposa y su hija se fueron en busca de comida.', cn: '那天早上，太阳一出来，他的妻子和女儿就出发去寻找食物。', startTime: 56.7, endTime: 62.7 },
    { id: 'es-2021-texto-1-11', number: 11, speaker: '', text: 'Acompañadas por otras mujeres y niños del pueblo subieron a la montaña más cercana.', cn: '在其他妇女和村里孩子的陪同下，她们爬上了最近的山。', startTime: 62.7, endTime: 67.3 },
    { id: 'es-2021-texto-1-12', number: 12, speaker: '', text: 'Trabajaban con tanta dedicación que la noche les sorprendió desprevenidos.', cn: '她们工作得太投入了，黑夜出其不意地降临了。', startTime: 67.3, endTime: 70.7 },
    { id: 'es-2021-texto-1-13', number: 13, speaker: '', text: 'Recogieron rápidamente sus cestas e intentaron bajar la montaña lo más deprisa que pudieron, pero sin luz era imposible guiarse entre tinieblas para encontrar el camino de vuelta al poblado.', cn: '她们迅速收拾好篮子，试图以最快的速度下山，但没有光，在黑暗中根本无法辨别方向，找不到回村的路。', startTime: 70.7, endTime: 80.7 },
    { id: 'es-2021-texto-1-14', number: 14, speaker: '', text: 'Fue entonces cuando, en medio de la oscuridad, vieron pasar la enorme estrella de cola que Caleu había visto la noche anterior y que por segunda vez atravesaba el cielo a gran velocidad.', cn: '就在那时，在黑暗中，她们看到Caleu前一天晚上看到的那颗巨大的彗星第二次高速划过天空。', startTime: 80.7, endTime: 91.7 },
    { id: 'es-2021-texto-1-15', number: 15, speaker: '', text: 'A su paso, una lluvia comenzó a caer, haciendo sonar un gran estruendo.', cn: '它经过时，开始下起雨来，发出巨大的响声。', startTime: 91.7, endTime: 96.0 },
    { id: 'es-2021-texto-1-16', number: 16, speaker: '', text: 'Pero no, no era de agua, sino de piedras que se estrellaron sobre la montaña y rodaron sobre la ladera, provocando multitud de chispas al chocar contra el suelo de la roca.', cn: '但不对，那不是雨，而是石头砸落在山上，顺着山坡滚下，撞击岩石地面迸发出无数火花。', startTime: 96.0, endTime: 106.7 },
    { id: 'es-2021-texto-1-17', number: 17, speaker: '', text: 'Una de esas chispas fue a parar a un árbol, y el tronco comenzó a arder, iluminando todo a su alrededor.', cn: '其中一个火花落在一棵树上，树干开始燃烧，照亮了周围的一切。', startTime: 106.7, endTime: 113.7 },
    { id: 'es-2021-texto-1-18', number: 18, speaker: '', text: 'Las mujeres se acercaron al árbol en llamas con los asustados niños y descubrieron que, gracias al fuego, podían verse unos a otros en las sombras.', cn: '妇女们带着受惊的孩子们靠近燃烧的树，发现借助火光，她们能在黑暗中看到彼此。', startTime: 113.7, endTime: 122.3 },
    { id: 'es-2021-texto-1-19', number: 19, speaker: '', text: 'También notaron que junto al árbol ardiente sus cuerpos se calentaban y era una sensación muy agradable.', cn: '她们还注意到在燃烧的树旁身体会变暖，这是一种非常舒适的感觉。', startTime: 122.3, endTime: 128.0 },
    { id: 'es-2021-texto-1-20', number: 20, speaker: '', text: 'Empezó a amanecer y llegó la hora de que cada uno regresara a su hogar.', cn: '天开始亮了，到了各自回家的时候。', startTime: 128.0, endTime: 133.0 },
    { id: 'es-2021-texto-1-21', number: 21, speaker: '', text: 'Durante el trayecto de vuelta las mujeres contaron que habían visto que al chocar unas piedras contra otras se producían chispas y que estas, al contacto con la madera, se convertían en llamas.', cn: '在返回的路上，妇女们说她们看到石头相互碰撞会产生火花，而这些火花接触到木头就会变成火焰。', startTime: 133.0, endTime: 144.0 },
    { id: 'es-2021-texto-1-22', number: 22, speaker: '', text: 'Así fue como los mapuches descubrieron el fuego. A partir de ese día perdieron el miedo a la oscuridad.', cn: '马普切人就这样发现了火。从那天起，他们不再害怕黑暗。', startTime: 144.0, endTime: 150.3 },
  ],
  // === es-2021-texto-2: Encuesta sobre niños y móviles ===
  'es-2021-texto-2': [
    { id: 'es-2021-texto-2-1', number: 1, speaker: '', text: 'De acuerdo con una encuesta realizada por el Instituto Nacional de Estadística, casi el 70% de los menores entre 10 y 15 años tienen un teléfono móvil.', cn: '根据国家统计局进行的一项调查，10至15岁的未成年人中近70%拥有手机。', startTime: 0, endTime: 9.0 },
    { id: 'es-2021-texto-2-2', number: 2, speaker: '', text: 'Al menos un millón de niños con la edad justa para abrir sus primeras cuentas en redes sociales ya tienen móvil.', cn: '至少有一百万名刚好达到开设首个社交媒体账户年龄的儿童已经拥有手机。', startTime: 9.0, endTime: 16.0 },
    { id: 'es-2021-texto-2-3', number: 3, speaker: '', text: 'Otra cosa es que sepan la responsabilidad que ello supone.', cn: '另一回事是他们是否了解这所承担的责任。', startTime: 16.0, endTime: 19.3 },
    { id: 'es-2021-texto-2-4', number: 4, speaker: '', text: 'Según un estudio llevado a cabo por la compañía tecnológica noruega Xplora, el 60% de los niños han pedido un teléfono móvil antes de los nueve años.', cn: '根据挪威科技公司Xplora进行的一项研究，60%的儿童在九岁之前就要求过买手机。', startTime: 19.3, endTime: 28.3 },
    { id: 'es-2021-texto-2-5', number: 5, speaker: '', text: 'La muestra se llevó a cabo sobre 400 familias con hijos de entre 5 y 12 años.', cn: '该抽样调查针对400个有5至12岁子女的家庭进行。', startTime: 28.3, endTime: 34.0 },
    { id: 'es-2021-texto-2-6', number: 6, speaker: '', text: 'Poco más de uno de cada cuatro lo han solicitado con siete años o menos.', cn: '略超过四分之一的孩子在七岁或更小时就提出过要求。', startTime: 34.0, endTime: 39.0 },
    { id: 'es-2021-texto-2-7', number: 7, speaker: '', text: 'En cuanto a las razones para comprárselo, un 73% de los padres y madres entrevistados señalan como motivo la tranquilidad que supone estar en contacto con su hijo o hija.', cn: '关于购买手机的原因，73%的受访父母指出，能够与子女保持联系所带来的安心感是主要原因。', startTime: 39.0, endTime: 49.0 },
    { id: 'es-2021-texto-2-8', number: 8, speaker: '', text: 'A una proporción muy similar de los mayores les preocupa el acceso que permiten los móviles a contenidos inadecuados para la edad de sus hijos, un dato que asciende hasta el 87% en el caso de los padres de más de 45 años.', cn: '类似比例的家长们担心手机让子女接触到不适合其年龄的内容，在45岁以上的家长中这一比例高达87%。', startTime: 49.0, endTime: 63.3 },
    { id: 'es-2021-texto-2-9', number: 9, speaker: '', text: 'El estudio se hizo público durante la presentación del Xplorer 4, un teléfono 4G en forma de reloj que no permite el acceso a Internet.', cn: '该研究是在Xplorer 4的发布会上公布的，这是一款手表形状的4G手机，不允许访问互联网。', startTime: 63.3, endTime: 71.7 },
    { id: 'es-2021-texto-2-10', number: 10, speaker: '', text: 'El teléfono reloj es sumergible, cuenta con cámara de fotos, facilita la localización del menor e incluye una función de control parental.', cn: '这款手表手机可防水，配有摄像头，便于定位儿童位置，并包含家长控制功能。', startTime: 71.7, endTime: 79.0 },
    { id: 'es-2021-texto-2-11', number: 11, speaker: '', text: 'En términos tecnológicos, se trata de un producto fiable y seguro.', cn: '从技术角度来说，这是一款可靠且安全的产品。', startTime: 79.0, endTime: 82.7 },
    { id: 'es-2021-texto-2-12', number: 12, speaker: '', text: '¿Qué ocurre en lo educativo?', cn: '在教育方面呢？', startTime: 82.7, endTime: 84.7 },
    { id: 'es-2021-texto-2-13', number: 13, speaker: '', text: 'Aunque es cierto que incluye una plataforma, GoPlay, que busca estimular la actividad física y las salidas al exterior en los menores, hay muchos más aspectos que hay que considerar.', cn: '虽然它确实包含一个名为GoPlay的平台，旨在鼓励未成年人进行体育活动和户外出行，但还有更多方面需要考虑。', startTime: 84.7, endTime: 94.7 },
    { id: 'es-2021-texto-2-14', number: 14, speaker: '', text: 'Sin duda es una buena opción para iniciar a los menores en la responsabilidad tecnológica, que no tiene nada que ver con cuidar el aparato.', cn: '这无疑是引导未成年人开始承担技术责任的好选择，而这种责任与爱护设备无关。', startTime: 94.7, endTime: 103.0 },
    { id: 'es-2021-texto-2-15', number: 15, speaker: '', text: 'La responsabilidad tecnológica, que en algún momento debería darse también en los colegios, implica saber cuándo usarlo y cómo y con quién compartir la información, etc.', cn: '技术责任——在某个时候也应在学校中教授——意味着知道何时使用手机、如何以及跟谁分享信息等。', startTime: 103.0, endTime: 111.7 },
    { id: 'es-2021-texto-2-16', number: 16, speaker: '', text: 'En lo que edad respecta, no hay un calendario fijo.', cn: '就年龄而言，没有固定的时间表。', startTime: 111.7, endTime: 115.0 },
    { id: 'es-2021-texto-2-17', number: 17, speaker: '', text: 'Cada niño es diferente.', cn: '每个孩子都是不同的。', startTime: 115.0, endTime: 117.0 },
    { id: 'es-2021-texto-2-18', number: 18, speaker: '', text: 'Aún los hermanos, entre sí, adquieren responsabilidades y rutinas a distintas edades.', cn: '即使是兄弟姐妹之间，培养责任感和日常习惯的年龄也不同。', startTime: 117.0, endTime: 121.0 },
    { id: 'es-2021-texto-2-19', number: 19, speaker: '', text: 'Nadie mejor que los padres para decidir cuando un niño está preparado para ir ascendiendo en la escala de la responsabilidad tecnológica, y también nadie mejor que ellos, para saber en qué momento los hijos piden un móvil por una verdadera necesidad y no tan solo porque todos lo tengan.', cn: '没有人比父母更清楚孩子何时准备好逐步提升技术责任等级，也无人比他们更能判断孩子何时是出于真正需要而要求买手机，而不仅仅是因为人人都有。', startTime: 121.0, endTime: 137.7 },
    { id: 'es-2021-texto-2-20', number: 20, speaker: '', text: 'Lo que sí está claro es que estos dispositivos pueden ser un buen disparador para una discusión sobre la tecnología con los hijos, que seguro sorprenden a sus padres.', cn: '可以确定的是，这些设备可以成为与孩子讨论技术问题的良好契机，而孩子们肯定会让父母感到惊讶。', startTime: 137.7, endTime: 147.3 },
  ],
  // === es-2023-dictado-1 ===
  'es-2023-dictado-1': [
    { id: 'es-2023-dictado-1-1', number: 1, speaker: '', text: 'La humanidad está fijándose en el espacio.', cn: '人类正把目光投向太空。', grammar: 'está fijándose = está fijando + se，estar + 副动词表示正在进行的动作。fijarse en = 关注/注视。', startTime: 0, endTime: 4.7 },
    { id: 'es-2023-dictado-1-2', number: 2, speaker: '', text: 'Quizá trate de comunicarse con seres inteligentes que habitan otros planetas.', cn: '也许它试图与居住在其他星球上的智慧生物沟通。', grammar: 'trate de = trata de的虚拟式（quizá要求虚拟式）= 试图。que habitan = 居住在...的。', startTime: 4.7, endTime: 12.0 },
    { id: 'es-2023-dictado-1-3', number: 3, speaker: '', text: 'Quizá se proponga buscar en el cosmos lugares apropiados para viajar e incluso alojarse.', cn: '也许它打算在宇宙中寻找适合旅行甚至居住的地方。', grammar: 'se proponga = 打算（虚拟式）。lugares apropiados para = 适合...的地方。', startTime: 12.0, endTime: 21.3 },
    { id: 'es-2023-dictado-1-4', number: 4, speaker: '', text: 'A pesar de todo, de una cosa estamos seguros: el espacio despierta cada día mayor interés en el ser humano.', cn: '尽管如此，有一件事我们是确定的：太空每天都引起人类越来越大的兴趣。', grammar: 'a pesar de todo = 尽管如此。de una cosa estamos seguros = 对一件事我们很确定。despierta interés = 引起兴趣。', startTime: 21.3, endTime: 34.7 },
    { id: 'es-2023-dictado-1-5', number: 5, speaker: '', text: 'Si no lo crees, pues mira: se están construyendo astronaves para que nos vayamos cada vez más lejos; se están instalando aparatos científicos para recoger informaciones sobre el espacio.', cn: '如果你不相信，那就看看吧：正在建造宇宙飞船让我们去越来越远的地方；正在安装科学设备来收集太空信息。', grammar: 'si no lo crees = 如果你不相信。se están construyendo = 正在被建造。cada vez más lejos = 越来越远。para que + 虚拟式 = 为了...。', startTime: 34.7, endTime: 54.0 },
  ],
  // === es-2023-texto-1 ===
  'es-2023-texto-1': [
    { id: 'es-2023-texto-1-1', number: 1, speaker: '', text: 'Sabes que el logotipo más dulce de la historia fue creado por Salvador Dalí?', cn: '你知道历史上最甜蜜的商标是由萨尔瓦多·达利设计的吗？', startTime: 0, endTime: 4.7 },
    { id: 'es-2023-texto-1-2', number: 2, speaker: '', text: 'Seguro que conoces la marca de golosinas más conocida, pero depende de dónde vivas si la conoce por un nombre u otro.', cn: '你肯定知道这个最著名的糖果品牌，但根据你居住的地方不同，人们对它的称呼也不同。', startTime: 4.7, endTime: 12.0 },
    { id: 'es-2023-texto-1-3', number: 3, speaker: '', text: 'En España es reconocido como chupa chups, chupetín en Argentina, chambelona en Cuba, paleta en México y así podríamos seguir durante horas.', cn: '在西班牙它被称为chupa chups，在阿根廷叫chupetín，在古巴叫chambelona，在墨西哥叫paleta，我们还可以这样列举几个小时。', startTime: 12.0, endTime: 19.3 },
    { id: 'es-2023-texto-1-4', number: 4, speaker: '', text: 'El creador del famoso caramelo fue Enric Bernat, nacido en Barcelona.', cn: '这种著名糖果的创始人是Enric Bernat，出生于巴塞罗那。', startTime: 19.3, endTime: 23.0 },
    { id: 'es-2023-texto-1-5', number: 5, speaker: '', text: 'Heredó de su familia el gusto por montar el negocio en el sector del dulce.', cn: '他继承了家族在甜食行业创业的爱好。', startTime: 23.0, endTime: 28.0 },
    { id: 'es-2023-texto-1-6', number: 6, speaker: '', text: 'Observando a los niños, se dio cuenta de que, a pesar de ser el principal objetivo de venta, los caramelos no estaban pensados para ellos, ya que eran demasiado grandes que apenas les cabían en la boca y los niños estaban acostumbrados a sacarse el dulce de la boca con la mano.', cn: '通过观察孩子们，他意识到尽管儿童是主要销售目标，但糖果并不是为他们设计的，因为糖果太大几乎放不进嘴里，孩子们习惯用手把糖从嘴里拿出来。', startTime: 28.0, endTime: 45.3 },
    { id: 'es-2023-texto-1-7', number: 7, speaker: '', text: 'De esta manera, se le ocurrió la idea de añadir un palo al caramelo y así podrían sacarlo de la boca para hablar o alargar su duración sin ensuciar las manos.', cn: '于是他想到在糖果上加一根棍子，这样他们就可以从嘴里拿出来说话，或在不弄脏手的情况下延长食用时间。', startTime: 45.3, endTime: 55.7 },
    { id: 'es-2023-texto-1-8', number: 8, speaker: '', text: 'Este particular dulce vio la luz en 1958.', cn: '这种特别的糖果于1958年问世。', startTime: 55.7, endTime: 58.3 },
    { id: 'es-2023-texto-1-9', number: 9, speaker: '', text: 'El primer caramelo con palito se fabricó en Asturias.', cn: '第一根棒棒糖在阿斯图里亚斯生产。', startTime: 58.3, endTime: 61.3 },
    { id: 'es-2023-texto-1-10', number: 10, speaker: '', text: 'Se vendía a una peseta, un precio elevado en aquel entonces, con el propósito de vender un producto con una imagen de calidad.', cn: '售价一比塞塔，在当时是高价，目的是以优质形象销售产品。', startTime: 61.3, endTime: 69.0 },
    { id: 'es-2023-texto-1-11', number: 11, speaker: '', text: 'El primer nombre que se le dio a la golosina fue Gol, debido a su forma de balón, pero no tuvo mucho éxito, por lo que decidieron contratar a una empresa de marketing para que les ayudasen, y lo pasaron a llamar Chups.', cn: '这款糖果最初被命名为Gol，因其球形，但不太成功，于是他们决定聘请一家营销公司来帮忙，随后改名为Chups。', startTime: 69.0, endTime: 83.3 },
    { id: 'es-2023-texto-1-12', number: 12, speaker: '', text: 'Más tarde, como en publicidades, se repetía chupa un dulce caramelo chupa chupa chupa chups.', cn: '后来，在广告中不断重复着chupa un dulce caramelo chupa chupa chupa chups（吸一口甜蜜的糖果）。', startTime: 83.3, endTime: 88.3 },
    { id: 'es-2023-texto-1-13', number: 13, speaker: '', text: 'Todo el mundo lo empezó a llamar chupa chups.', cn: '所有人都开始叫它chupa chups。', startTime: 88.3, endTime: 91.3 },
    { id: 'es-2023-texto-1-14', number: 14, speaker: '', text: 'Gozando el producto de un auge importante dentro de España, Bernat buscaría dar el siguiente paso con miras a internacionalizar la marca.', cn: '在西班牙国内大获成功后，Bernat寻求迈出下一步，着眼于品牌的国际化。', startTime: 91.3, endTime: 98.7 },
    { id: 'es-2023-texto-1-15', number: 15, speaker: '', text: 'Para ello necesitaba crear un logotipo y quería que fuese lo más profesional posible.', cn: '为此他需要创建一个商标，他希望这个商标尽可能专业。', startTime: 98.7, endTime: 103.3 },
    { id: 'es-2023-texto-1-16', number: 16, speaker: '', text: 'Aprovechando el dinero que había ganado, no quiso escatimar en gastos y contrató al magnífico pintor Salvador Dalí.', cn: '利用赚来的钱，他不惜重金，聘请了杰出的画家萨尔瓦多·达利。', startTime: 103.3, endTime: 109.3 },
    { id: 'es-2023-texto-1-17', number: 17, speaker: '', text: 'Dalí añadió unas modificaciones como poner un fondo de forma de flor y reducir la paleta de colores al amarillo y rojo.', cn: '达利做了一些修改，比如加入花朵形状的背景，并将调色板缩减为黄色和红色。', startTime: 109.3, endTime: 116.7 },
    { id: 'es-2023-texto-1-18', number: 18, speaker: '', text: 'Sugirió que el lugar ideal para poner el logotipo era la parte superior del caramelo porque así las letras se leerían sin dificultad y la flor quedaría bien estirada.', cn: '他建议放置商标的理想位置是糖果的上方，因为这样字母容易阅读，花朵也能很好地展开。', startTime: 116.7, endTime: 126.3 },
    { id: 'es-2023-texto-1-19', number: 19, speaker: '', text: 'Este detalle, además, le ha dado a esta golosina española una identidad propia.', cn: '此外，这个细节赋予了这种西班牙糖果独特的身份标识。', startTime: 126.3, endTime: 130.7 },
    { id: 'es-2023-texto-1-20', number: 20, speaker: '', text: 'A partir de ahí, la marca se expandió de una forma muy rápida.', cn: '从那时起，这个品牌迅速发展壮大。', startTime: 130.7, endTime: 135.0 },
  ],
}

// ========== 材料详情 ==========
const MATERIALS = {
  'lecture-1': { id: 'lecture-1', title: '2024年6月英语四级听力 - 新闻报道1', year: 2024, month: 6, level: 4, type: 'LECTURE', duration: 180, setNumber: 1 },
  'dialogue-1': { id: 'dialogue-1', title: '2024年6月英语四级听力 - 对话1', year: 2024, month: 6, level: 4, type: 'DIALOGUE', duration: 150, setNumber: 1 },
  'passage-1': { id: 'passage-1', title: '2024年6月英语四级听力 - 短文1', year: 2024, month: 6, level: 4, type: 'PASSAGE', duration: 200, setNumber: 1 },
  // 西语专四
  'es-2015-dictado-1': { id: 'es-2015-dictado-1', title: '2015年西语专四 - 听写：医学职业', year: 2015, month: 6, level: 8, type: 'DICTADO', duration: 60, setNumber: 1 },
  'es-2016-dictado-1': { id: 'es-2016-dictado-1', title: '2016年西语专四 - 听写：阅读与视力', year: 2016, month: 6, level: 8, type: 'DICTADO', duration: 80, setNumber: 1 },
  'es-2017-dictado-1': { id: 'es-2017-dictado-1', title: '2017年西语专四 - 听写：洗礼仪式', year: 2017, month: 6, level: 8, type: 'DICTADO', duration: 80, setNumber: 1 },
  'es-2018-dictado-1': { id: 'es-2018-dictado-1', title: '2018年西语专四 - 听写：北京出租车', year: 2018, month: 6, level: 8, type: 'DICTADO', duration: 80, setNumber: 1 },
  'es-2019-dictado-1': { id: 'es-2019-dictado-1', title: '2019年西语专四 - 听写：萨拉曼卡', year: 2019, month: 6, level: 8, type: 'DICTADO', duration: 80, setNumber: 1 },
  'es-2019-texto-1': { id: 'es-2019-texto-1', title: '2019年西语专四 - 听力理解：墨西哥土著青年', year: 2019, month: 6, level: 8, type: 'PASSAGE', duration: 150, setNumber: 1 },
  'es-2019-texto-2': { id: 'es-2019-texto-2', title: '2019年西语专四 - 听力理解：亚马逊河传说', year: 2019, month: 6, level: 8, type: 'PASSAGE', duration: 155, setNumber: 2 },
  'es-2021-dictado-1': { id: 'es-2021-dictado-1', title: '2021年西语专四 - 听写：电影回忆', year: 2021, month: 6, level: 8, type: 'DICTADO', duration: 85, setNumber: 1 },
  'es-2021-texto-1': { id: 'es-2021-texto-1', title: '2021年西语专四 - 听力理解：马普切人发现火', year: 2021, month: 6, level: 8, type: 'PASSAGE', duration: 155, setNumber: 1 },
  'es-2021-texto-2': { id: 'es-2021-texto-2', title: '2021年西语专四 - 听力理解：儿童与手机', year: 2021, month: 6, level: 8, type: 'PASSAGE', duration: 150, setNumber: 2 },
  'es-2023-dictado-1': { id: 'es-2023-dictado-1', title: '2023年西语专四 - 听写：太空探索', year: 2023, month: 6, level: 8, type: 'DICTADO', duration: 60, setNumber: 1 },
  'es-2023-texto-1': { id: 'es-2023-texto-1', title: '2023年西语专四 - 听力理解：Chupa Chups与达利', year: 2023, month: 6, level: 8, type: 'PASSAGE', duration: 140, setNumber: 1 },
}

// ========== 导航数据 ==========
export const NAVIGATION_DATA = {
  years: [
    {
      id: 'year-2024', title: '2024年',
      months: [{
        id: 'month-2024-6', title: '6月',
        cet4: [{
          id: 'set-4-1', label: '第1套',
          items: [
            { id: 'lecture-1', label: '新闻报道', type: 'LECTURE', year: 2024, month: 6, setNumber: 1, level: 4 },
            { id: 'dialogue-1', label: '对话', type: 'DIALOGUE', year: 2024, month: 6, setNumber: 1, level: 4 },
            { id: 'passage-1', label: '短文', type: 'PASSAGE', year: 2024, month: 6, setNumber: 1, level: 4 }
          ]
        }],
        cet6: []
      }]
    },
    { id: 'year-es-2015', title: '2015年（西语）',
      months: [{
        id: 'month-es-2015', title: '6月',
        items: [{
          id: 'set-es-2015-1', label: '第1套',
          items: [
            { id: 'es-2015-dictado-1', label: '听写：医学职业', type: 'DICTADO', year: 2015, month: 6, setNumber: 1, level: 8 },
          ]
        }]
      }]
    },
    { id: 'year-es-2016', title: '2016年（西语）',
      months: [{
        id: 'month-es-2016', title: '6月',
        items: [{
          id: 'set-es-2016-1', label: '第1套',
          items: [
            { id: 'es-2016-dictado-1', label: '听写：阅读与视力', type: 'DICTADO', year: 2016, month: 6, setNumber: 1, level: 8 },
          ]
        }]
      }]
    },
    { id: 'year-es-2017', title: '2017年（西语）',
      months: [{
        id: 'month-es-2017', title: '6月',
        items: [{
          id: 'set-es-2017-1', label: '第1套',
          items: [
            { id: 'es-2017-dictado-1', label: '听写：洗礼仪式', type: 'DICTADO', year: 2017, month: 6, setNumber: 1, level: 8 },
          ]
        }]
      }]
    },
    { id: 'year-es-2018', title: '2018年（西语）',
      months: [{
        id: 'month-es-2018', title: '6月',
        items: [{
          id: 'set-es-2018-1', label: '第1套',
          items: [
            { id: 'es-2018-dictado-1', label: '听写：北京出租车', type: 'DICTADO', year: 2018, month: 6, setNumber: 1, level: 8 },
          ]
        }]
      }]
    },
    { id: 'year-es-2019', title: '2019年（西语）',
      months: [{
        id: 'month-es-2019', title: '6月',
        items: [{
          id: 'set-es-2019-1', label: '第1套',
          items: [
            { id: 'es-2019-dictado-1', label: '听写：萨拉曼卡', type: 'DICTADO', year: 2019, month: 6, setNumber: 1, level: 8 },
            { id: 'es-2019-texto-1', label: '听力：墨西哥土著青年', type: 'PASSAGE', year: 2019, month: 6, setNumber: 1, level: 8 },
            { id: 'es-2019-texto-2', label: '听力：亚马逊河传说', type: 'PASSAGE', year: 2019, month: 6, setNumber: 2, level: 8 },
          ]
        }]
      }]
    },
    { id: 'year-es-2021', title: '2021年（西语）',
      months: [{
        id: 'month-es-2021', title: '6月',
        items: [{
          id: 'set-es-2021-1', label: '第1套',
          items: [
            { id: 'es-2021-dictado-1', label: '听写：电影回忆', type: 'DICTADO', year: 2021, month: 6, setNumber: 1, level: 8 },
            { id: 'es-2021-texto-1', label: '听力：马普切人发现火', type: 'PASSAGE', year: 2021, month: 6, setNumber: 1, level: 8 },
            { id: 'es-2021-texto-2', label: '听力：儿童与手机', type: 'PASSAGE', year: 2021, month: 6, setNumber: 2, level: 8 },
          ]
        }]
      }]
    },
    { id: 'year-es-2023', title: '2023年（西语）',
      months: [{
        id: 'month-es-2023', title: '6月',
        items: [{
          id: 'set-es-2023-1', label: '第1套',
          items: [
            { id: 'es-2023-dictado-1', label: '听写：太空探索', type: 'DICTADO', year: 2023, month: 6, setNumber: 1, level: 8 },
            { id: 'es-2023-texto-1', label: '听力：Chupa Chups与达利', type: 'PASSAGE', year: 2023, month: 6, setNumber: 1, level: 8 },
          ]
        }]
      }]
    },
  ],
  special: [
    {
      id: 'special-english', title: '英语专项训练',
      items: [
        { id: 'lecture-1', label: '新闻训练', type: 'LECTURE' },
        { id: 'dialogue-1', label: '对话训练', type: 'DIALOGUE' },
        { id: 'passage-1', label: '短文训练', type: 'PASSAGE' }
      ]
    },
    {
      id: 'special-spanish', title: '西语专项训练',
      items: [
        { id: 'es-2023-dictado-1', label: '听写训练', type: 'DICTADO' },
        { id: 'es-2023-texto-1', label: '短文训练', type: 'PASSAGE' },
        { id: 'es-2021-texto-1', label: '故事理解', type: 'PASSAGE' },
        { id: 'es-2021-texto-2', label: '调查理解', type: 'PASSAGE' },
      ]
    }
  ]
}

/** 根据 id 获取材料详情 */
export function getMaterialById (id) {
  return MATERIALS[id] || null
}

/** 根据 id 获取字幕行 */
export function getTranscriptById (id) {
  const lines = TRANSCRIPTS[id]
  return lines ? { listeningId: id, lines } : null
}

/** 获取同套试卷的其他材料 */
export function getSetItems (params) {
  const { year, month, level, setNumber } = params
  return Object.values(MATERIALS).filter(m =>
    m.year === year && m.month === month && m.level === level && m.setNumber === setNumber
  ).map(m => ({
    id: m.id, title: m.title, type: m.type, year: m.year,
    month: m.month, level: m.level, setNumber: m.setNumber
  }))
}

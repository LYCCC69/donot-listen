package com.donotlisten.common;

import com.donotlisten.auth.UserEntity;
import com.donotlisten.auth.UserRepository;
import com.donotlisten.listening.ListeningMaterialEntity;
import com.donotlisten.listening.ListeningMaterialEntity.ListeningType;
import com.donotlisten.listening.ListeningRepository;
import com.donotlisten.listening.TranscriptLineEntity;
import com.donotlisten.listening.TranscriptLineRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final ListeningRepository listeningRepository;
    private final TranscriptLineRepository transcriptLineRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                            ListeningRepository listeningRepository,
                            TranscriptLineRepository transcriptLineRepository,
                            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.listeningRepository = listeningRepository;
        this.transcriptLineRepository = transcriptLineRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0 || listeningRepository.count() > 0) {
            return;
        }

        log.info("No data found, initializing sample data...");

        // Create demo user
        var user = new UserEntity();
        user.setUsername("demo");
        user.setEmail("demo@example.com");
        user.setPassword(passwordEncoder.encode("123456"));
        user.setLevel(4);
        user.setTotalListening(0);
        user.setMasteredCount(0);
        userRepository.save(user);
        log.info("Demo user created: demo / 123456");

        // Create CET-4 listening materials
        createMaterial("lecture-1", "2024年6月英语四级听力 - 新闻报道1", 2024, 6, 4,
                ListeningType.LECTURE, 180, "/audio/lecture-1.mp3", 1);
        createMaterial("dialogue-1", "2024年6月英语四级听力 - 对话1", 2024, 6, 4,
                ListeningType.DIALOGUE, 150, "/audio/dialogue-1.mp3", 1);
        createMaterial("passage-1", "2024年6月英语四级听力 - 短文1", 2024, 6, 4,
                ListeningType.PASSAGE, 200, "/audio/passage-1.mp3", 1);

        // Create transcript lines for the lecture
        createLine("l1-1", "lecture-1", 1, "W",
                "Good morning, this is the reception desk. How can I help you?",
                0.0, 5.0);
        createLine("l1-2", "lecture-1", 2, "M",
                "Hi, I'm calling about the conference room booking for tomorrow.",
                5.0, 10.0);
        createLine("l1-3", "lecture-1", 3, "W",
                "Let me check the schedule. Yes, we have a room available at 2 PM.",
                10.0, 16.0);
        createLine("l1-4", "lecture-1", 4, "M",
                "That would be perfect. Can you reserve it for two hours?",
                16.0, 21.0);
        createLine("l1-5", "lecture-1", 5, "W",
                "Of course. I'll book the conference room A for you from 2 to 4 PM.",
                21.0, 27.0);

        // Create transcript lines for the dialogue
        createLine("d1-1", "dialogue-1", 1, "M",
                "Excuse me, could you tell me how to get to the nearest subway station?",
                0.0, 6.0);
        createLine("d1-2", "dialogue-1", 2, "W",
                "Sure. Go straight ahead and turn left at the traffic lights.",
                6.0, 12.0);
        createLine("d1-3", "dialogue-1", 3, "M",
                "Is it far from here? I'm a bit in a hurry.",
                12.0, 16.0);
        createLine("d1-4", "dialogue-1", 4, "W",
                "No, it's only about a five-minute walk from here.",
                16.0, 21.0);

        // Create transcript lines for the passage
        createLine("p1-1", "passage-1", 1, null,
                "The Internet has changed the way we communicate with each other.",
                0.0, 6.0);
        createLine("p1-2", "passage-1", 2, null,
                "People can now share information instantly across the globe.",
                6.0, 12.0);
        createLine("p1-3", "passage-1", 3, null,
                "This has created new opportunities for education and business.",
                12.0, 18.0);
        createLine("p1-4", "passage-1", 4, null,
                "However, it also brings challenges such as online privacy concerns.",
                18.0, 24.0);
        createLine("p1-5", "passage-1", 5, null,
                "We must learn to use technology wisely and responsibly.",
                24.0, 30.0);

        // === 西班牙语专四听力材料 (2021-2025) ===

        // --- 2022年 ---
        createMaterial("es-2022-dialogo-1", "2022年西语专四听力 - 对话：问路", 2022, 6, 8,
                ListeningType.DIALOGUE, 120, "/audio/es-2022-dialogo-1.mp3", 1);
        createMaterial("es-2022-noticia-1", "2022年西语专四听力 - 新闻：气候变化", 2022, 6, 8,
                ListeningType.LECTURE, 150, "/audio/es-2022-noticia-1.mp3", 1);
        createMaterial("es-2022-texto-1", "2022年西语专四听力 - 短文：塞万提斯", 2022, 6, 8,
                ListeningType.PASSAGE, 180, "/audio/es-2022-texto-1.mp3", 1);

        // 对话：问路
        createLine("es22-d1-1", "es-2022-dialogo-1", 1, "H",
                "Perdona, ¿sabes dónde está la biblioteca? Llevo media hora buscándola.",
                0.0, 6.0);
        createLine("es22-d1-2", "es-2022-dialogo-1", 2, "M",
                "Sí, claro. Está al lado del edificio de ciencias, frente al parque central.",
                6.0, 12.0);
        createLine("es22-d1-3", "es-2022-dialogo-1", 3, "H",
                "¿Está lejos? Tengo que devolver unos libros antes de las cinco.",
                12.0, 17.0);
        createLine("es22-d1-4", "es-2022-dialogo-1", 4, "M",
                "No, solo son diez minutos andando. Te acompaño si quieres.",
                17.0, 22.0);

        // 新闻：气候变化
        createLine("es22-n1-1", "es-2022-noticia-1", 1, null,
                "La cumbre internacional sobre el cambio climático se ha celebrado esta semana en Madrid.",
                0.0, 7.0);
        createLine("es22-n1-2", "es-2022-noticia-1", 2, null,
                "Más de cien países han firmado un nuevo acuerdo para reducir las emisiones de carbono.",
                7.0, 14.0);
        createLine("es22-n1-3", "es-2022-noticia-1", 3, null,
                "El objetivo principal es limitar el calentamiento global a 1.5 grados centígrados.",
                14.0, 21.0);
        createLine("es22-n1-4", "es-2022-noticia-1", 4, null,
                "Los expertos advierten que es urgente tomar medidas antes de 2030.",
                21.0, 27.0);

        // 短文：塞万提斯
        createLine("es22-t1-1", "es-2022-texto-1", 1, null,
                "Miguel de Cervantes Saavedra es considerado la figura más importante de la literatura española.",
                0.0, 7.0);
        createLine("es22-t1-2", "es-2022-texto-1", 2, null,
                "Nació en Alcalá de Henares en 1547 y es conocido mundialmente por su obra Don Quijote de la Mancha.",
                7.0, 15.0);
        createLine("es22-t1-3", "es-2022-texto-1", 3, null,
                "La primera parte de Don Quijote se publicó en 1605 y fue un éxito inmediato.",
                15.0, 22.0);
        createLine("es22-t1-4", "es-2022-texto-1", 4, null,
                "La obra es considerada la primera novela moderna y una de las mejores de la historia universal.",
                22.0, 30.0);

        // --- 2023年 ---
        createMaterial("es-2023-dialogo-1", "2023年西语专四听力 - 对话：餐厅点餐", 2023, 6, 8,
                ListeningType.DIALOGUE, 130, "/audio/es-2023-dialogo-1.mp3", 1);
        createMaterial("es-2023-noticia-1", "2023年西语专四听力 - 新闻：教育发展", 2023, 6, 8,
                ListeningType.LECTURE, 160, "/audio/es-2023-noticia-1.mp3", 1);
        createMaterial("es-2023-texto-1", "2023年西语专四听力 - 短文：拉丁美洲文化", 2023, 6, 8,
                ListeningType.PASSAGE, 190, "/audio/es-2023-texto-1.mp3", 1);

        // 对话：餐厅点餐
        createLine("es23-d1-1", "es-2023-dialogo-1", 1, "Camarero",
                "Buenas tardes, ¿qué desean comer? Aquí tienen la carta del día.",
                0.0, 6.0);
        createLine("es23-d1-2", "es-2023-dialogo-1", 2, "Cliente",
                "Gracias. ¿Qué me recomienda? Hoy tengo mucha hambre.",
                6.0, 11.0);
        createLine("es23-d1-3", "es-2023-dialogo-1", 3, "Camarero",
                "La paella valenciana es el plato estrella de la casa. Muy recomendable.",
                11.0, 17.0);
        createLine("es23-d1-4", "es-2023-dialogo-1", 4, "Cliente",
                "Perfecto, entonces quiero una paella y una ensalada verde.",
                17.0, 22.0);
        createLine("es23-d1-5", "es-2023-dialogo-1", 5, "Camarero",
                "Muy bien, en unos veinte minutos estará todo listo.",
                22.0, 27.0);

        // 新闻：教育发展
        createLine("es23-n1-1", "es-2023-noticia-1", 1, null,
                "El Ministerio de Educación ha anunciado un nuevo plan de becas para estudiantes universitarios.",
                0.0, 7.0);
        createLine("es23-n1-2", "es-2023-noticia-1", 2, null,
                "El programa beneficiará a más de 50 mil estudiantes de bajos recursos económicos.",
                7.0, 14.0);
        createLine("es23-n1-3", "es-2023-noticia-1", 3, null,
                "Las becas cubrirán la matrícula completa y parte de los gastos de manutención.",
                14.0, 21.0);
        createLine("es23-n1-4", "es-2023-noticia-1", 4, null,
                "El plazo de solicitud comenzará el próximo mes y durará hasta septiembre.",
                21.0, 28.0);

        // 短文：拉丁美洲文化
        createLine("es23-t1-1", "es-2023-texto-1", 1, null,
                "América Latina es una región rica en diversidad cultural y tradiciones ancestrales.",
                0.0, 7.0);
        createLine("es23-t1-2", "es-2023-texto-1", 2, null,
                "La música y la danza ocupan un lugar central en la vida de sus pueblos.",
                7.0, 14.0);
        createLine("es23-t1-3", "es-2023-texto-1", 3, null,
                "El tango, la salsa y el flamenco son expresiones artísticas reconocidas mundialmente.",
                14.0, 21.0);
        createLine("es23-t1-4", "es-2023-texto-1", 4, null,
                "La celebración del Día de los Muertos en México es Patrimonio Cultural Inmaterial de la Humanidad.",
                21.0, 29.0);

        // --- 2024年 ---
        createMaterial("es-2024-dialogo-1", "2024年西语专四听力 - 对话：旅游规划", 2024, 6, 8,
                ListeningType.DIALOGUE, 140, "/audio/es-2024-dialogo-1.mp3", 1);
        createMaterial("es-2024-noticia-1", "2024年西语专四听力 - 新闻：科技创新", 2024, 6, 8,
                ListeningType.LECTURE, 170, "/audio/es-2024-noticia-1.mp3", 1);
        createMaterial("es-2024-texto-1", "2024年西语专四听力 - 短文：西班牙美食", 2024, 6, 8,
                ListeningType.PASSAGE, 200, "/audio/es-2024-texto-1.mp3", 1);

        // 对话：旅游规划
        createLine("es24-d1-1", "es-2024-dialogo-1", 1, "Ana",
                "¿Has pensado ya dónde queremos viajar estas vacaciones de verano?",
                0.0, 5.0);
        createLine("es24-d1-2", "es-2024-dialogo-1", 2, "Pedro",
                "Me gustaría ir a Barcelona. He oído que la ciudad es preciosa.",
                5.0, 10.0);
        createLine("es24-d1-3", "es-2024-dialogo-1", 3, "Ana",
                "Buena idea. Podemos visitar la Sagrada Familia y el Parque Güell.",
                10.0, 16.0);
        createLine("es24-d1-4", "es-2024-dialogo-1", 4, "Pedro",
                "Sí, y también podemos ir a la playa y probar la comida local.",
                16.0, 22.0);
        createLine("es24-d1-5", "es-2024-dialogo-1", 5, "Ana",
                "Perfecto. Vamos a reservar los billetes de tren esta semana.",
                22.0, 27.0);

        // 新闻：科技创新
        createLine("es24-n1-1", "es-2024-noticia-1", 1, null,
                "Una empresa española ha desarrollado un nuevo sistema de energía solar más eficiente.",
                0.0, 7.0);
        createLine("es24-n1-2", "es-2024-noticia-1", 2, null,
                "El sistema puede generar hasta un 40 por ciento más de energía que los paneles tradicionales.",
                7.0, 15.0);
        createLine("es24-n1-3", "es-2024-noticia-1", 3, null,
                "La compañía planea instalar estos paneles en edificios públicos de toda España.",
                15.0, 22.0);
        createLine("es24-n1-4", "es-2024-noticia-1", 4, null,
                "Este avance supone un paso importante hacia la transición energética del país.",
                22.0, 29.0);

        // 短文：西班牙美食
        createLine("es24-t1-1", "es-2024-texto-1", 1, null,
                "La gastronomía española es una de las más variadas y apreciadas del mundo.",
                0.0, 7.0);
        createLine("es24-t1-2", "es-2024-texto-1", 2, null,
                "El aceite de oliva es un ingrediente fundamental en la cocina española.",
                7.0, 13.0);
        createLine("es24-t1-3", "es-2024-texto-1", 3, null,
                "Platos como la tortilla de patatas, el gazpacho y el jamón serrano son famosos internacionalmente.",
                13.0, 21.0);
        createLine("es24-t1-4", "es-2024-texto-1", 4, null,
                "Cada región de España tiene sus propias especialidades culinarias y tradiciones gastronómicas.",
                21.0, 28.0);

        // --- 2025年 ---
        createMaterial("es-2025-dialogo-1", "2025年西语专四听力 - 对话：求职面试", 2025, 6, 8,
                ListeningType.DIALOGUE, 140, "/audio/es-2025-dialogo-1.mp3", 1);
        createMaterial("es-2025-noticia-1", "2025年西语专四听力 - 新闻：文化交流", 2025, 6, 8,
                ListeningType.LECTURE, 160, "/audio/es-2025-noticia-1.mp3", 1);
        createMaterial("es-2025-texto-1", "2025年西语专四听力 - 短文：环境保护", 2025, 6, 8,
                ListeningType.PASSAGE, 190, "/audio/es-2025-texto-1.mp3", 1);

        // 对话：求职面试
        createLine("es25-d1-1", "es-2025-dialogo-1", 1, "Entrevistador",
                "Cuénteme un poco sobre su formación académica y experiencia laboral.",
                0.0, 6.0);
        createLine("es25-d1-2", "es-2025-dialogo-1", 2, "Candidato",
                "Estudié Traducción e Interpretación en la Universidad de Salamanca.",
                6.0, 12.0);
        createLine("es25-d1-3", "es-2025-dialogo-1", 3, "Entrevistador",
                "¿Tiene experiencia trabajando en equipos internacionales?",
                12.0, 17.0);
        createLine("es25-d1-4", "es-2025-dialogo-1", 4, "Candidato",
                "Sí, el año pasado hice prácticas en una empresa multinacional durante seis meses.",
                17.0, 24.0);
        createLine("es25-d1-5", "es-2025-dialogo-1", 5, "Entrevistador",
                "Muy bien. Le llamaremos la semana que viene para comunicarle nuestra decisión.",
                24.0, 30.0);

        // 新闻：文化交流
        createLine("es25-n1-1", "es-2025-noticia-1", 1, null,
                "El Instituto Cervantes ha inaugurado una nueva sede en Shanghái.",
                0.0, 6.0);
        createLine("es25-n1-2", "es-2025-noticia-1", 2, null,
                "El centro ofrecerá cursos de español y actividades culturales para promover el intercambio.",
                6.0, 13.0);
        createLine("es25-n1-3", "es-2025-noticia-1", 3, null,
                "Más de mil estudiantes ya se han inscrito en los primeros cursos programados.",
                13.0, 19.0);
        createLine("es25-n1-4", "es-2025-noticia-1", 4, null,
                "Las autoridades confían en que esto fortalecerá los lazos entre China y los países hispanohablantes.",
                19.0, 27.0);

        // 短文：环境保护
        createLine("es25-t1-1", "es-2025-texto-1", 1, null,
                "Cada vez más ciudades españolas están adoptando medidas para proteger el medio ambiente.",
                0.0, 7.0);
        createLine("es25-t1-2", "es-2025-texto-1", 2, null,
                "Barcelona ha ampliado su red de carriles bici y ha reducido el tráfico en el centro urbano.",
                7.0, 15.0);
        createLine("es25-t1-3", "es-2025-texto-1", 3, null,
                "Madrid ha implantado zonas de bajas emisiones que restringen el acceso a vehículos contaminantes.",
                15.0, 23.0);
        createLine("es25-t1-4", "es-2025-texto-1", 4, null,
                "Los ciudadanos apoyan mayoritariamente estas iniciativas por un futuro más sostenible.",
                23.0, 30.0);

        log.info("Sample data initialized successfully!");
        log.info("Spanish TEM-4 materials (2022-2025) added to the database.");
    }

    private void createMaterial(String id, String title, int year, int month, int level,
                                 ListeningType type, int duration, String audioUrl, int setNumber) {
        var m = new ListeningMaterialEntity();
        m.setId(id);
        m.setTitle(title);
        m.setYear(year);
        m.setMonth(month);
        m.setLevel(level);
        m.setType(type);
        m.setDuration(duration);
        m.setAudioUrl(audioUrl);
        m.setSetNumber(setNumber);
        listeningRepository.save(m);
    }

    private void createLine(String id, String listeningId, int number, String speaker,
                             String text, double startTime, double endTime) {
        var l = new TranscriptLineEntity();
        l.setId(id);
        l.setListeningId(listeningId);
        l.setNumber(number);
        l.setSpeaker(speaker);
        l.setText(text);
        l.setStartTime(startTime);
        l.setEndTime(endTime);
        transcriptLineRepository.save(l);
    }
}

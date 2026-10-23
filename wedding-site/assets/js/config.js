/* ==========================================================================
   WEDDING WEBSITE — CONFIG
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit. Every name, date, address and
   sentence on the site lives here. Text is written as { vi: "...", en: "..." }
   so the VI / EN toggle in the header works automatically.

   Anything marked  // TODO  is sample data — replace it with your own.
   ========================================================================== */

window.WEDDING_CONFIG = {
  /* --- The couple ------------------------------------------------------- */
  couple: {
    groom: {
      short: { vi: "Hoàng Nam", en: "Hoàng Nam" },              // shown in the hero
      full:  { vi: "Vũ Hoàng Nam", en: "Vu Hoang Nam" },
      role:  { vi: "Chú rể", en: "The Groom" },
      monogram: "N",
    },
    bride: {
      short: { vi: "Bích Thảo", en: "Bích Thảo" },
      full:  { vi: "Ngô Thị Bích Thảo", en: "Ngo Thi Bich Thao" },
      role:  { vi: "Cô dâu", en: "The Bride" },
      monogram: "T",
    },
    hashtag: "#NamThaoWedding",
  },

  /* --- When ------------------------------------------------------------- */
  // ISO 8601 with the Vietnam offset (+07:00). Drives the countdown + calendar.
  dateISO: "2026-12-20T11:00:00+07:00",                        // TODO
  dateDisplay: { vi: "Chủ Nhật, 20 · 12 · 2026", en: "Sunday, 20 December 2026" }, // TODO
  dateDisplayShort: { vi: "20 · 12 · 2026", en: "20.12.2026" },  // TODO (footer)
  lunarDate:   { vi: "tức mùng 12 tháng Mười Một, năm Bính Ngọ",
                 en: "12th day of the 11th lunar month, Year of the Horse" },       // TODO

  /* --- Headlines -------------------------------------------------------- */
  copy: {
    htmlTitle: { vi: "Bích Thảo & Hoàng Nam — Thiệp Cưới", en: "Bích Thảo & Hoàng Nam — Wedding Invitation" },
    eyebrow:   { vi: "Trân trọng kính mời", en: "Together with their families" },
    saveTheDate: { vi: "Save the Date", en: "Save the Date" },
    scroll:    { vi: "Cuộn xuống", en: "Scroll" },
    tagline:   { vi: "Hai ta về chung một nhà",
                 en: "Two families, one home" },

    /* The invitation letter */
    letterTitle: { vi: "Lời Ngỏ", en: "A Note For You" },
    letterBody: {
      vi: "Có những ngày ta chỉ mong thời gian trôi thật chậm, để được nhìn nhau lâu hơn một chút. " +
          "Sau bao mùa nắng mưa, tụi mình quyết định nắm tay nhau đi hết đoạn đường còn lại. " +
          "Sự có mặt của bạn trong ngày vui này là món quà quý giá nhất mà tụi mình có thể mong. " +
          "Hẹn gặp bạn trong chiếc áo dài đẹp nhất, và trong nụ cười rạng rỡ nhất nhé.",
      en: "Some days you wish time would slow down, just so you could look at each other a little longer. " +
          "After many seasons together, we have decided to hold hands for the rest of the road. " +
          "Your presence on our happiest day is the most precious gift we could ask for. " +
          "Come in your finest áo dài, and bring your brightest smile.",
    },
    letterSign: { vi: "Bích Thảo & Hoàng Nam", en: "Bích Thảo & Hoàng Nam" },

    /* Section headings */
    detailsTitle:  { vi: "Ngày Trọng Đại", en: "The Big Day" },
    detailsIntro:  { vi: "Rất mong được đón tiếp bạn tại hai buổi lễ.",
                     en: "We would be honoured to welcome you to both celebrations." },
    timelineTitle: { vi: "Chương Trình", en: "Order of the Day" },
    galleryTitle:  { vi: "Ảnh Cưới", en: "Our Portraits" },
    galleryIntro:  { vi: "Từ áo dài truyền thống đến áo ngũ thân cung đình — hai tà áo, một chữ duyên.",
                     en: "From the classic áo dài to imperial five-panel robes — two hems, one destiny." },
    contactTitle:  { vi: "Liên Hệ & Xác Nhận", en: "Contact & Confirmation" },
    contactIntro:  { vi: "Tụi mình chưa mở form xác nhận trực tuyến. Bạn vui lòng nhắn tin hoặc gọi trực tiếp để báo ngày về chung vui nhé.",
                     en: "There is no online RSVP form — simply message or call us to let us know you are coming." },
    footerNote:    { vi: "Sự hiện diện của bạn là niềm vui của chúng mình.",
                     en: "Your presence is our joy." },
  },

  /* --- The events ------------------------------------------------------- */
  // Add, remove or reorder freely — the cards render in order.
  events: [
    {
      icon: "rings",                                          // rings | cup
      startISO: "2026-12-20T09:00:00+07:00",                  // TODO (used by "Add to calendar")
      endISO:   "2026-12-20T10:30:00+07:00",
      title:   { vi: "Lễ Đính Hôn", en: "Engagement Ceremony" }, // TODO
      time:    { vi: "09:00 — Chủ Nhật", en: "09:00 AM — Sunday" },
      date:    { vi: "20 tháng 12, 2026", en: "20 December 2026" },
      venue:   { vi: "Nhà gái", en: "Bride's home" }, // TODO
      address: { vi: "65/2/1/5, Đường 20, P. Hiệp Bình, TP. Thủ Đức, TP. Hồ Chí Minh",
                 en: "65/2/1/5, 20th Street, Hiep Binh Ward, Thu Duc City, Ho Chi Minh City" },                 // TODO
      dress:   { vi: "Áo dài hoặc trang phục lịch sự", en: "Áo dài or smart-casual" },
      note:    { vi: "Đón khách từ 09:00. Lễ được cử hành đúng giờ, mong bạn đến sớm một chút.",
                 en: "Doors open at 09:00. The ceremony starts on time — please arrive a little early." },
      mapUrl:  "https://maps.app.goo.gl/4as4UfYacYR1Vm8cA",                   // TODO: paste a Google Maps share link
    },
    {
      icon: "cup",
      startISO: "2026-12-20T11:00:00+07:00",                  // TODO
      endISO:   "2026-12-20T13:00:00+07:00",
      title:   { vi: "Tiệc Cưới", en: "Wedding Reception" }, // TODO
      time:    { vi: "11:00 — Chủ Nhật", en: "01:00 PM — Sunday" },
      date:    { vi: "20 tháng 12, 2026", en: "20 December 2026" },
      venue:   { vi: "Sảnh Lala Land, Amor Resort", en: "Lala Land Hall, Amor Resort" },                  // TODO
      address: { vi: "61A Nguyễn Văn Đậu, Bình Lợi Trung, Thủ Đức, TP. Hồ Chí Minh",
                 en: "61A Nguyen Van Dau, Binh Loi Trung Ward, Thu Duc City, Ho Chi Minh City" },                 // TODO
      dress:   { vi: "Áo dài, vest hoặc lịch sự", en: "Áo dài, suit or smart-casual" },
      note:    { vi: "Đón khách 10:30, khai tiệc 11:00. Có chỗ để xe và khu vực chụp hình.",
                 en: "Reception at 10:30 AM, lunch at 11:00 AM. Parking and a photo corner are available." },
      mapUrl:  "https://maps.app.goo.gl/Z4tYzLF6cDQJb7Tn9",                   // TODO
    },
  ],

  /* --- Timeline --------------------------------------------------------- */
  timeline: [
    { time: "07:30", text: { vi: "Bắt đầu cúng lễ gia tiên ở nhà trai", en: "Start the ancestral rite ceremony at groom's home" } },
    { time: "08:00", text: { vi: "Di chuyển tới nhà gái", en: "Move to the bride's home" } },
    { time: "09:15", text: { vi: "Lễ Đính Hôn", en: "Engagement ceremony" } },
    { time: "10:00", text: { vi: "Di chuyển ra nhà hàng", en: "Move to the restaurant" } },
    { time: "11:00", text: { vi: "Tiệc trưa thân mật", en: "Intimate lunch" } },
  ],

  /* --- Portraits / gallery ---------------------------------------------- */
  gallery: [
    { src: "assets/img/chibi-aodai.webp", alt: { vi: "Cô dâu chú rể trong áo dài", en: "The couple in áo dài" },
      caption: { vi: "Áo Dài — sắc xanh & sắc đỏ", en: "Áo Dài — blue & red" } },
    { src: "assets/img/chibi-historical.webp", alt: { vi: "Cô dâu chú rể trong áo ngũ thân cung đình", en: "The couple in imperial áo ngũ thân" },
      caption: { vi: "Áo Ngũ Thân — cung đình xưa", en: "Áo Ngũ Thân — imperial court" } },
  ],

  /* --- Contact (replaces the RSVP form) --------------------------------- */
  contacts: [
    { name: { vi: "Chú rể Hoàng Nam", en: "Hoàng Nam (Groom)" }, phone: "+84 90 000 0000", zalo: "https://zalo.me/84900000000" }, // TODO phone
    { name: { vi: "Cô dâu Bích Thảo", en: "Bích Thảo (Bride)" }, phone: "+84 90 000 0001", zalo: "https://zalo.me/84900000001" }, // TODO phone
  ],
  rsvpBy: { vi: "Vui lòng phản hồi trước 20 · 11 · 2026", en: "Kindly reply before 20 November 2026" }, // TODO
  email: "hello@example.com", // TODO

  /* --- Extras ----------------------------------------------------------- */
  showCountdown: true,
  showLunarDate: true,
  showCalendarButton: true,   // "Add to calendar" (.ics) button in the hero
  defaultLang: "vi",          // vi | en
};

import React from "react";

const HomeView = () => {
  return  (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">Witaj w naszym kantorze internetowym!</h1>
        <p className="lead">Najlepsze kursy wymiany walut online.</p>
        <hr className="my-4" />
        <p>Skorzystaj z łatwego w użyciu interfejsu do szybkiego wymieniania walut po atrakcyjnych kursach.</p>
      </div>

      <section>
        <h2 className="mb-3">Dlaczego warto nas wybrać?</h2>
        <p>W kantorze internetowym gwarantujemy:</p>
        <ul>
          <li>Bezpieczne i szybkie transakcje.</li>
          <li>Atrakcyjne kursy wymiany.</li>
          <li>Intuicyjny interfejs użytkownika.</li>
          <li>Wsparcie klienta 24/7.</li>
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="mb-3">Jak to działa?</h2>
        <p>Tutaj możesz umieścić instrukcje dotyczące korzystania z Twojego kantoru, kroki wymiany walut, itp.</p>
      </section>

      <section className="mt-4 mb-5">
        <h2 className="mb-3">Skontaktuj się z nami</h2>
        <p>Masz pytania? Chcesz dowiedzieć się więcej? Skontaktuj się z naszą obsługą klienta.</p>
      </section>
      
    </div>
  );
};

export default HomeView;

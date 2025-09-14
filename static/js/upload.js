const uploadCircle = document.getElementById("uploadCircle");
const fileInput = document.getElementById("fileInput");
const progress = document.getElementById("progress");
const status = document.getElementById("status");
const uploadIcon = document.getElementById("uploadIcon");
const linkBox = document.getElementById("linkBox");
const copyBtn = document.getElementById("copyBtn");
const fileLink = document.getElementById("fileLink");

// Abre seletor de arquivo
uploadCircle.addEventListener("click", () => {
  fileInput.click();
});

// Upload com progress
fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    status.textContent = "Carregando arquivo...";
    progress.style.height = "0%";
    uploadIcon.className = "fas fa-upload";
    uploadIcon.style.color = "#ff7e5f";
    linkBox.style.display = "none";

    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload', true);

    xhr.upload.addEventListener("progress", e => {
      if (e.lengthComputable) {
        const percent = (e.loaded / e.total) * 100;
        progress.style.height = percent + "%";
      }
    });

    xhr.onload = () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.responseText);
        status.textContent = "Upload concluído!";
        uploadIcon.className = "fas fa-check";
        uploadIcon.style.color = "green";

        fileLink.textContent = res.link;
        linkBox.style.display = "flex";
      } else {
        status.textContent = "Erro no upload!";
      }
    };

    xhr.onerror = () => {
      status.textContent = "Erro de conexão!";
    };

    xhr.send(formData);
  }
});

// Copiar link
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(fileLink.textContent).then(() => {
    status.textContent = "Link copiado!";
  });
});

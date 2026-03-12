export default function Footer() {
  return (
    <footer className="plp-footer">
      <style>{`
        .plp-footer {
          text-align: center; padding: 32px 24px; margin-top: 64px;
          border-top: 1px solid var(--border-subtle, #2a3042);
          font-size: 12px; color: var(--text-muted, #4a5568);
        }
      `}</style>
      <p>&copy; {new Date().getFullYear()} Property Launch Pad. All rights reserved.</p>
    </footer>
  );
}

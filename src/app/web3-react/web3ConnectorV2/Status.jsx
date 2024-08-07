export function Status({ isActivating, isActive, error }) {
  return (
    <div>
      {error ? (
        <>
          🔴 {error.name ?? "Error"}
          {error.message ? `: ${error.message}` : null}
        </>
      ) : isActivating ? (
        <>🟡 Connecting</>
      ) : isActive ? (
        <>🟢 Connected</>
      ) : (
        <>⚪️ Disconnected</>
      )}
    </div>
  );
}

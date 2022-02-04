import React from "react";
import { useTranslation } from "react-i18next";
import { useStyletron } from "styletron-react";
import { border } from ".././utils/css";

type PaymentBankwireProps = {
  amount: number;
  id: string;
  legend?: string;
};

export default function PaymentBankwire(props: PaymentBankwireProps) {
  const [css] = useStyletron();
  const accountNumber = "2800300596";
  const bankCode = "2010";
  const qrCode = `https://api.paylibo.com/paylibo/generator/czech/image?accountNumber=${accountNumber}&bankCode=${bankCode}&amount=${props.amount}&currency=CZK&message=${props.id}&size=120`;
  const { t } = useTranslation();

  return (
    <form>
      <fieldset
        className={css({
          ...border(),
          borderTop: "1px solid rgba(0, 0, 0, 0.3)",
          padding: "0",
          marginTop: "1rem",
        })}
      >
        <legend
          className={css({
            padding: "0 1rem",
            textAlign: "center",
            fontSize: "0.9rem",
            fontWeight: 500,
            color: "rgb(0, 0, 0, 0.8)",
          })}
        >
          {props.legend || t("payment.bankwire.legend")}
        </legend>
        <div
          className={css({
            display: "flex",
          })}
        >
          <div>
            <div className={css({ display: "flex" })}>
              <div
                className={css({
                  margin: "0 1rem 1rem 0",
                  flexGrow: 1,
                })}
              >
                <label
                  className={css({
                    color: "rgba(0, 0, 0, 0.7)",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  })}
                >
                  {t("payment.bankwire.account-number")}
                </label>
                <input
                  disabled
                  className={css({
                    backgroundColor: "transparent",
                    padding: "5px 0 6px 0",
                    ...border(),
                    borderBottom: "1px solid rgb(232, 232, 232)",
                    width: "100%",
                    fontSize: "1.1rem",
                    transition:
                      "border-color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)",
                  })}
                  value={accountNumber}
                />
              </div>
              <div
                className={css({
                  margin: "0 0 1rem 0",
                })}
              >
                <label
                  className={css({
                    color: "rgba(0, 0, 0, 0.7)",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  })}
                >
                  {t("payment.bankwire.bank-code")}
                </label>
                <input
                  disabled
                  className={css({
                    backgroundColor: "transparent",
                    padding: "5px 0 6px 0",
                    ...border(),
                    borderBottom: "1px solid rgb(232, 232, 232)",
                    width: "100%",
                    fontSize: "1.1rem",
                    transition:
                      "border-color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)",
                  })}
                  value={bankCode}
                />
              </div>
            </div>
            <div className={css({ display: "flex" })}>
              <div
                className={css({
                  margin: "1rem 1rem 1rem 0",
                  flexGrow: 1,
                })}
              >
                <label
                  className={css({
                    color: "rgba(0, 0, 0, 0.7)",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  })}
                >
                  {t("payment.bankwire.message")}
                </label>
                <input
                  disabled
                  className={css({
                    backgroundColor: "transparent",
                    padding: "5px 0 6px 0",
                    ...border(),
                    borderBottom: "1px solid rgb(232, 232, 232)",
                    width: "100%",
                    fontSize: "1.1rem",
                    transition:
                      "border-color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)",
                  })}
                  value={props.id}
                  onClick={() => document.execCommand("copy")}
                />
              </div>
              <div
                className={css({
                  margin: "1rem 0",
                })}
              >
                <label
                  className={css({
                    color: "rgba(0, 0, 0, 0.7)",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  })}
                >
                  {t("payment.bankwire.amount")}
                </label>
                <input
                  disabled
                  className={css({
                    backgroundColor: "transparent",
                    padding: "5px 0 6px 0",
                    ...border(),
                    borderBottom: "1px solid rgb(232, 232, 232)",
                    width: "100%",
                    fontSize: "1.1rem",
                    transition:
                      "border-color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)",
                  })}
                  value={props.amount}
                />
              </div>
            </div>
          </div>
          <img
            className={css({
              width: "160px",
              height: "100%",
              top: "-10px",
              right: "-10px",
              position: "relative",
            })}
            src={qrCode}
          />
        </div>
      </fieldset>
    </form>
  );
}

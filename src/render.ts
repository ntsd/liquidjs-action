import { Liquid } from "liquidjs";

export async function liquidJSRender(templateString: string, jsonVariables: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        try {
            const variables = JSON.parse(jsonVariables)

            const engine = new Liquid();
            const template = engine.parse(templateString);

            engine.render(template, variables)
                .then((result) => {
                    resolve(result)
                })
                .catch(err => reject(err));
        } catch (err) {
            reject(err)
        }
    });
}
